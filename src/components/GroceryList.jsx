import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getData, addData, deleteData } from "../services/firestoreService";
import css from './../styles/GroceryList.module.css';
import Button from '@mui/material/Button';

const GroceryList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("other");
  const [expiration, setExpiration] = useState("");
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
      expiration: new Date(expiration)
    };
    await addData(user.uid, 'grocery', newIngredient);
    setShowForm(false);
    setTitle("");
    setQuantity(0);
    setCategory("produce");
    setExpiration("");
    const updatedIngredients = await getData(user.uid, 'grocery');
    setIngredients(updatedIngredients);
  };

    return (
      <body>
    <main className={css.container}>
      <div className={css.header}>
        <h1>Groceries</h1>
        {/* I do not know what ButtonUsage is... */}
        <ButtonUsage/>
        <button type="button" className="button header" onClick={() => setShowForm(true)}>⨁ New Item</button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
            <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="produce">Produce</option>
                <option value="protein">Protein</option>
                <option value="dairy">Dairy</option>
                <option value="grains">Grains</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="expiration">Expiration Date:</label>
              <input
                type="date"
                id="expiration"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">Add Ingredient</button>
          </form>
        )}
        <button type="button" className="button" onClick={handleDeleteSelected}>Delete Selected</button>

      </div>
      <section className={css.grocery}>
        <div className={css.produce}>
          <h2>Produce</h2>
          <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'produce')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input
                      type="checkbox"
                      name={`produce${ingredient.id}`}
                      value={ingredient.title}
                      checked={selectedItems.includes(ingredient.id)}
                      onChange={() => handleCheckboxChange(ingredient.id)}
                    />
                    <label htmlFor={`produce${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
        </div>
        <div className={css.protein}>
          <h2>Protein</h2>
          <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'protein')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input
                      type="checkbox"
                      name={`protein${ingredient.id}`}
                      value={ingredient.title}
                      checked={selectedItems.includes(ingredient.id)}
                      onChange={() => handleCheckboxChange(ingredient.id)}
                    />
                    <label htmlFor={`protein${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
        </div>
        <div className={css.dairy}>
          <h2>Dairy</h2>
          <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'dairy')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input
                      type="checkbox"
                      name={`dairy${ingredient.id}`}
                      value={ingredient.title}
                      checked={selectedItems.includes(ingredient.id)}
                      onChange={() => handleCheckboxChange(ingredient.id)}
                    />
                    <label htmlFor={`dairy${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
        </div>
        <section className={css.smallColumn}>
          <div className={css.grains}>
            <h2>Grains</h2>
            <ul>
            {ingredients
                .filter(ingredient => ingredient.category === 'grains')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input
                      type="checkbox"
                      name={`grains${ingredient.id}`}
                      value={ingredient.title}
                      checked={selectedItems.includes(ingredient.id)}
                      onChange={() => handleCheckboxChange(ingredient.id)}
                    />
                    <label htmlFor={`grains${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
          </div>
          <div className={css.other}>
            <h2>Other</h2>
            <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'other')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input
                      type="checkbox"
                      name={`other${ingredient.id}`}
                      value={ingredient.title}
                      checked={selectedItems.includes(ingredient.id)}
                      onChange={() => handleCheckboxChange(ingredient.id)}
                    />
                    <label htmlFor={`other${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  </body>
    )
}      
export default GroceryList;

export function ButtonUsage() {
  return <Button variant="text" href="#outlined-buttons">
    ⨁ New Item
  </Button>;
}

export function renderColumn() {
  
}