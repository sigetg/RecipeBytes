import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getData, addData, deleteData } from "../services/firestoreService";
import css from './../styles/GroceryList.module.css';
import Button from '@mui/material/Button';
import { groceries } from "../data/grocery";

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
      <body className="grocery-body">
        <main className={css.container}>
        <div className={css.header}>
          <h1>Groceries</h1>
          <Button variant="text" href="#outlined-buttons" sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
            ⨁ New Item
          </Button>
        </div>
        <section className={css.grocery}>
          {groceries.map((category) => (
              <GroceryCategory key={category.name} name={category.name} items={category.items} />
            ))}
        </section>
      </main>
    </body>
    )
}
export default GroceryList;

const GroceryCategory = ({ name, items }) => (
  <div className={`${css[name.toLowerCase()]} ${(name === "grain" || name === "other") ? css.smallColumn : ""}`}>
    <h2>{name}</h2>
    {items.length > 0 ? (
      <ul>
        {items.map((item, index) => (
          <GroceryItem key={index} name={item} />
        ))}
      </ul>
    ) : (
      <p>No items yet. Click 'New Item' to add one now!</p>
    )}
  </div>
);


const GroceryItem = ({ name }) => (
  <li>
    <input type="checkbox" id={name.toLowerCase()} value={name} />
    <label htmlFor={name.toLowerCase()}>{name}</label>
  </li>
);