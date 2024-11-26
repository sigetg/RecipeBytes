import React from "react";
import css from './../styles/GroceryList.module.css';
import Button from '@mui/material/Button';
import { groceries } from "../data/grocery";

const GroceryList = () => {
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