import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getIngredients,
  addIngredient,
  deleteIngredient,
  getIngredient,
  updateIngredient,
} from "../services/ingredientsService";
import PantryForm from "./PantryForm";
import PantryCategory from "./PantryCategory";
import { createPortal } from "react-dom";
import { Ingredient } from "../types";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { categories } from "../data/category";
import Button from "@mui/material/Button";
import css from "../styles/PantryList.module.css";

const PantryList: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [customUnit, setCustomUnit] = useState("");
  const [category, setCategory] = useState("produce");
  const [expiration, setExpiration] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dragging, setDragging] = useState<Ingredient | null>(null);


  const auth = getAuth();
  const user = auth.currentUser;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const fetchIngredients = async () => {
      const fetched = await getIngredients(user!.uid, "pantry");
      setIngredients(fetched);
    };
    const interval = setInterval(() => setCurrentDate(new Date()), 3600000);
    fetchIngredients();
    return () => clearInterval(interval);
  }, [user]);

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "title": setTitle(value); break;
      case "quantity": setQuantity(Number(value)); break;
      case "unit": setUnit(value); break;
      case "customUnit": setCustomUnit(value); break;
      case "category": setCategory(value); break;
      case "expiration": setExpiration(value); break;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<Ingredient, "id"> = {
      title,
      quantity,
      unit: unit === "other" ? customUnit : unit,
      category,
      expiration: new Date(expiration),
    };
    await addIngredient(user!.uid, "pantry", newItem);
    const updated = await getIngredients(user!.uid, "pantry");
    setIngredients(updated);
    setTitle(""); setQuantity(0); setUnit(""); setCustomUnit(""); setCategory("produce"); setExpiration("");
    setShowForm(false);
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedItems) {
      await deleteIngredient(user!.uid, "pantry", id);
    }
    const updated = await getIngredients(user!.uid, "pantry");
    setIngredients(updated);
    setSelectedItems([]);
  };

  const addSelectedToGrocery = async () => {
    for (const id of selectedItems) {
      const item = await getIngredient(user!.uid, "pantry", id);
      const { id: _, ...newItem } = item!;
      await addIngredient(user!.uid, "grocery", newItem);
    }
    setSelectedItems([]);
  };

  function generateLabel(ingredient: Ingredient, currentDate: Date): JSX.Element {
    const getDaysLeft = (expiration: number, current: number): number => {
      return Math.ceil((expiration - current) / (1000 * 60 * 60 * 24));
    };
  
    const daysLeft = getDaysLeft(ingredient.expiration.getTime(), currentDate.getTime());
  
    if (daysLeft < 0) {
      return <span className={`${css.expirationLabel} ${css.expired}`}>EXPIRED</span>;
    } else if (daysLeft === 0) {
      return <span className={`${css.expirationLabel} ${css.expired}`}>EXPIRES TODAY</span>;
    } else if (daysLeft <= 4) {
      return (
        <span className={`${css.expirationLabel} ${css.soonToExpire}`}>
          expires in {daysLeft} days
        </span>
      );
    } else {
      return <span className={css.expirationLabel}>expires in {daysLeft} days</span>;
    }
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    setDragging(null);
    const { active, over } = event;
    if (!over) return;
  
    const fromCat = active.data.current?.containerId as string;
    const toCat   = over.data.current?.containerId  as string;
  
    if (fromCat === toCat) {
      setIngredients((prev) => {
        // split list
        const list = prev.filter((i) => i.category === fromCat);
        const others = prev.filter((i) => i.category !== fromCat);
    
        const oldIndex = list.findIndex((i) => i.id === active.id);
        const newIndex = list.findIndex((i) => i.id === over.id);
    
        const reordered = arrayMove(list, oldIndex, newIndex);
        return [...others, ...reordered];
      });
      return;
    }
  
    // different column -> change category
    updateIngredient(user!.uid, "pantry", active.id.toString(), { category: toCat });
  
    setIngredients((prev) =>
      prev.map((i) => (i.id === active.id ? { ...i, category: toCat } : i))
    );
  };

  const handleDragStart = (e: DragStartEvent) => {
    const item = ingredients.find((i) => i.id === e.active.id);
    if (item) setDragging(item);
  };

  return (
    <body className="pantry-body">
      <main className={css.container}>
        <div className={css.header}>
          <h1>Pantry Tracker</h1>
          <Button onClick={handleDeleteSelected}>Delete Selected</Button>
          <Button onClick={addSelectedToGrocery}>Add Selected to Grocery</Button>
          <Button onClick={toggleForm}>⨁ New Item</Button>
          {showForm && (
            <PantryForm
              title={title}
              quantity={quantity}
              unit={unit}
              customUnit={customUnit}
              category={category}
              expiration={expiration}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
        <section className={css.pantry}>
            {categories.map((cat) => {
                  const items = ingredients
                  .filter((ing): ing is Ingredient => !!ing && ing.category === cat.name);

              return (
              <PantryCategory 
                key={cat.name}
                name={cat.name}
                ingredients={items}
                currentDate={currentDate}
                selectedItems={selectedItems}
                onCheckboxChange={handleCheckboxChange}
                generateLabel={generateLabel}
              />
            );
          })}
        </section>
          {createPortal(
            <DragOverlay>
              {dragging ? (
                <div className={css.dragOverlay}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(dragging.id)}
                    readOnly
                    style={{ marginRight: 6 }}
                  />
                  <span>
                    {dragging.title} ({dragging.quantity} {dragging.unit})
                  </span>
                  {generateLabel(dragging, currentDate)}
                </div>
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </main>
    </body>
  );
};

export default PantryList;