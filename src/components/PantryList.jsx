import React, { useState, useEffect } from "react";
import { getData, addData } from "../services/firestoreService";
import css from './../styles/PantryList.module.css';


const PantryList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("produce");
  const [expiration, setExpiration] = useState("");
  useEffect(() => {
    const fetchIngredients = async () => {
      const fetchedIngredients = await getData('ingredients');
      setIngredients(fetchedIngredients);
    };

    fetchIngredients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIngredient = {
      title,
      quantity,
      category,
      expiration: new Date(expiration)
    };
    await addData('ingredients', newIngredient);
    setShowForm(false);
    setTitle("");
    setQuantity(0);
    setCategory("produce");
    setExpiration("");
    const updatedIngredients = await getData('ingredients');
    setIngredients(updatedIngredients);
  };
  return (
      <body>
      <main className={css.container}>
        <h1 className={css.header}>Pantry</h1>
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
        <section className="pantry">
          <div className="produce">
            <h2>Produce</h2>
            <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'produce')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input type="checkbox" name={`produce${ingredient.id}`} value={ingredient.title} />
                    <label htmlFor={`produce${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
          </div>
          <div className="protein">
            <h2>Protein</h2>
            <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'protein')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input type="checkbox" name={`produce${ingredient.id}`} value={ingredient.title} />
                    <label htmlFor={`produce${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
          </div>
          <div className="dairy">
            <h2>Dairy</h2>
            <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'dairy')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input type="checkbox" name={`produce${ingredient.id}`} value={ingredient.title} />
                    <label htmlFor={`produce${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <div className="grains">
              <h2>Grains</h2>
              <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'grain')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input type="checkbox" name={`produce${ingredient.id}`} value={ingredient.title} />
                    <label htmlFor={`produce${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
            </div>
            <div className="other">
              <h2>Other</h2>
              <ul>
              {ingredients
                .filter(ingredient => ingredient.category === 'other')
                .map(ingredient => (
                  <li key={ingredient.id}>
                    <input type="checkbox" name={`produce${ingredient.id}`} value={ingredient.title} />
                    <label htmlFor={`produce${ingredient.id}`}>{ingredient.title}</label><br />
                  </li>
                ))}
            </ul>
            </div>
          </div>
        </section>
      </main>
    </body>
  )
}
export default PantryList;