import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import css from "../styles/PantryList.module.css";
import { Ingredient } from "../types";

interface PantryCategoryProps {
  name: string;
  ingredients: Ingredient[];
  selectedItems: string[];
  onCheckboxChange: (id: string) => void;
  currentDate: Date;
  generateLabel: (ingredient: Ingredient, currentDate: Date) => JSX.Element;
}

interface SortableIngredientProps {
  ingredient: Ingredient;
  containerId: string;               // 👈 new
  selectedItems: string[];
  onCheckboxChange: (id: string) => void;
  currentDate: Date;
  generateLabel: (i: Ingredient, d: Date) => JSX.Element;
}

const SortableIngredient: React.FC<SortableIngredientProps> = (props) => {
  const {
  ingredient,
  containerId,
  selectedItems,
  onCheckboxChange,
  currentDate,
  generateLabel,
} = props;

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active,
  } = useSortable({
    id: ingredient.id,
    data: { containerId },   
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  if (isDragging && active) {
    const height = active.rect.current?.translated?.height ?? 40;
  
    return (
      <li
        ref={setNodeRef}
        style={{
          height,
        }}
      />
    );
  }  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      key={ingredient.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      tabIndex={0}
    >
      <input
        type="checkbox"
        checked={selectedItems.includes(ingredient.id)}
        onChange={() => onCheckboxChange(ingredient.id)}
      />
      <label>
        {`${ingredient.title} (${ingredient.quantity} ${ingredient.unit})`}
      </label>
      {generateLabel(ingredient, currentDate)}
    </li>
  );
};

const PantryCategory: React.FC<PantryCategoryProps> = (props) => {
  const { 
    name: categoryName,
    ingredients,
    selectedItems,
    onCheckboxChange,
    currentDate,
    generateLabel,
   } = props;

  /** list of items in this category */
  const items = ingredients.filter((ing) => ing.category === categoryName);

  /** make the whole column a droppable target */
  const { setNodeRef } = useDroppable({
    id: categoryName,
    data: { containerId: categoryName },
  });

  return (
    <div
      ref={setNodeRef}
      className={css[categoryName.toLowerCase()]}
      style={{ minHeight: 120 }}
    >
      <h2>{categoryName}</h2>

      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <ul>
          {items.map((ingredient) => (
            <SortableIngredient
              key={ingredient.id}
              ingredient={ingredient}
              selectedItems={selectedItems}
              onCheckboxChange={onCheckboxChange}
              currentDate={currentDate}
              generateLabel={generateLabel}
              containerId={categoryName}
             />
          ))}
        </ul>
      </SortableContext>

      {items.length === 0 && <p className={css.noItem}>No items yet. Click 'New Item' to add one now!</p>}
    </div>
  );
};

export default PantryCategory;
