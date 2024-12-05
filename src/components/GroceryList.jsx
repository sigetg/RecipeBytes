import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getData, addData, deleteData, getSingleData } from "../services/firestoreService";
import css from './../styles/GroceryList.module.css';
import Button from '@mui/material/Button';
import { catagories } from "../data/catagory";

const GroceryList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("other");
  const [expiration, setExpiration] = useState("");
  const [customUnit, setCustomUnit] = useState("");
  const [unit, setUnit] = useState("unit");
  const [selectedItems, setSelectedItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchIngredients = async () => {
      const fetchedIngredients = await getData(user.uid, 'grocery');
      setIngredients(fetchedIngredients);
    };

    fetchIngredients();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter(item => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedItems) {
      await deleteData(user.uid, 'grocery', id);
    }
    const updatedIngredients = await getData(user.uid, 'grocery');
    setIngredients(updatedIngredients);
    setSelectedItems([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIngredient = {
      title,
      quantity,
      category,
      expiration: new Date(expiration),
      unit: unit === "other" ? customUnit : unit
    };
    await addData(user.uid, 'grocery', newIngredient);
    setShowForm(false);
    setTitle("");
    setQuantity(0);
    setCategory("produce");
    setExpiration("");
    setUnit("unit");
    const updatedIngredients = await getData(user.uid, 'grocery');
    setIngredients(updatedIngredients);
  };

  const moveSelectedToPantry = async () => {
    if (user) {
      for (const id of selectedItems) {
        // Get the item from the grocery collection
        const item = await getSingleData(user.uid, 'grocery', id);
        // Create a new ingredient without the id field
        const { id: _, ...newIngredient } = item;
        // Add the item to the pantry collection
        await addData(user.uid, 'pantry', newIngredient);
        // Delete the item from the grocery collection
        await deleteData(user.uid, 'grocery', id);
      }
      const updatedIngredients = await getData(user.uid, 'grocery');
      setIngredients(updatedIngredients);
      setSelectedItems([]);
    }
  };



  const toggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

// Maybe refactor to implement this later...
  // const GroceryItem = ({ name }) => (
  //     <li key={ingredient.id}>
  //     <input
  //       type="checkbox"
  //       name={`${name}${ingredient.id}`}
  //       value={ingredient.title}
  //       checked={selectedItems.includes(ingredient.id)}
  //       onChange={() => handleCheckboxChange(ingredient.id)}
  //     />
  //     <label htmlFor={`${name}${ingredient.id}`}>{ingredient.title}</label><br />
  //   </li>
  // );

  const GroceryCategory = ({ name, ingredients }) => (
    <div className={`${css[name.toLowerCase()]} ${(name === "grain" || name === "other") ? css.smallColumn : ""}`}>
      <h2>{name}</h2>
      {ingredients.filter(ingredient => ingredient.category === name).length > 0 ? (
        <ul>
          {ingredients
            .filter(ingredient => ingredient.category === name)
            .map(ingredient => (
              <li key={ingredient.id}>
                <input
                  type="checkbox"
                  name={`${name}${ingredient.id}`}
                  value={ingredient.title}
                  checked={selectedItems.includes(ingredient.id)}
                  onChange={() => handleCheckboxChange(ingredient.id)}
                />
                <label htmlFor={`${name}${ingredient.id}`}>{ingredient.quantity > 1 ? `${ingredient.title} (${ingredient.quantity} ${ingredient.unit})` : `${ingredient.title} (${ingredient.quantity} ${ingredient.unit})`}</label><br />
              </li>
            ))}
          </ul>
      ) : (
        <p className = {css.noItem}>No items yet. Click 'New Item' to add one now!</p>
      )}
    </div>
  );

    return (
      <body className="grocery-body">
        <main className={css.container}>
        <div className={css.header}>
          <h1>Grocery List</h1>
          <Button variant="text" onClick={handleDeleteSelected} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
            Delete Selected
          </Button>
          <Button variant="text" onClick={moveSelectedToPantry} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
            Move Selected to Pantry
          </Button>
          <Button variant="text" onClick={toggleForm} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
            ⨁ New Item
          </Button>
        {showForm && (
          <form onSubmit={handleSubmit} className={css.form}>
            <div>
              <h2>Add Item</h2>
              <label htmlFor="title">Item: </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity: </label>
            <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="unit">Quantity Unit:</label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              >
                <option value="">None</option>
                <option value="cup">Cup</option>
                <option value="tablespoon">Tablespoon</option>
                <option value="teaspoon">Teaspoon</option>
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="other">Other</option>
                {unit === "other" && (
                <input
                  type="text"
                  id="customUnit"
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  placeholder="Enter custom unit"
                  required
                />
              )}
              </select>
              {unit === "other" && (
                <input
                  type="text"
                  id="customUnit"
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  placeholder="Enter custom unit"
                  required
                />
              )}
            </div>
            <div>
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                value={category}
                min="0"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="produce">Produce</option>
                <option value="protein">Protein</option>
                <option value="dairy">Dairy</option>
                <option value="grain">Grains</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="expiration">Expiration Date: </label>
              <input
                type="date"
                id="expiration"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">Add Grocery Item</button>
          </form>
        )}

        </div>
        <section className={css.grocery}>
          {catagories.map((category) => (
              <GroceryCategory key={category.name} name={category.name} ingredients={ingredients} />
            ))}
        </section>
      </main>
    </body>
    )
}
export default GroceryList;