import React from "react";
import css from './../styles/GroceryList.module.css';
import Button from '@mui/material/Button';

const GroceryList = () => {
    return (
      <body>
    <main className={css.container}>
      <div className={css.header}>
        <h1>Groceries</h1>
        <ButtonUsage/>
      </div>
      <section className={css.grocery}>
        <div className={css.produce}>
          <h2>Produce</h2>
          <ul>
            <li>
              <input type="checkbox" name="produce1" value="Potato" />
              <label for="produce1">Potatoes</label><br />
            </li>
            <li>
              <input type="checkbox" name="produce2" value="Tomato" />
              <label for="produce2">Tomatoes</label><br />
            </li>
            <li>
              <input type="checkbox" name="produce3" value="Carrots" />
              <label for="produce3">Carrots</label><br />
            </li>
          </ul>
        </div>
        <div className={css.protein}>
          <h2>Protein</h2>
          <ul>
            <li>
              <input type="checkbox" name="protein1" value="Beef" />
              <label for="protein1">Beef</label><br />
            </li>
            <li>
              <input type="checkbox" name="protein2" value="Chicken" />
              <label for="protein2">Chicken</label><br />
            </li>
            <li>
              <input type="checkbox" name="protein3" value="Salmon" />
              <label for="protein3">Salmon</label><br />
            </li>
            <li>
              <input type="checkbox" name="protein4" value="Lamb" />
              <label for="protein4">Lamb</label><br />
            </li>

            <li>
              <input type="checkbox" name="protein5" value="Shrimp" />
              <label for="protein5">Shrimp</label><br />
            </li>
          </ul>
        </div>
        <div className={css.dairy}>
          <h2>Dairy</h2>
          <ul>
            <li>
              <input type="checkbox" name="dairy1" value="Milk" />
              <label for="dairy1">Milk</label><br />
            </li>
            <li>
              <input type="checkbox" name="dairy2" value="Butter" />
              <label for="dairy2">Butter</label><br />
            </li>
            <li>
              <input type="checkbox" name="dairy3" value="Cheese" />
              <label for="dairy3">Cheese</label><br />
            </li>
            <li>
              <input type="checkbox" name="dairy4" value="Cream" />
              <label for="dairy4">Cream</label><br />
            </li>
          </ul>
        </div>
        <section className={css.smallColumn}>
          <div className={css.grains}>
            <h2>Grains</h2>
            <ul>
              <li>
                <input type="checkbox" name="grains1" value="Shrimp" />
                <label for="grains1">Oats</label><br />
              </li>
              <li>
                <input type="checkbox" name="grains2" value="Quinoa" />
                <label for="grains2">Quinoa</label><br />
              </li>
            </ul>
          </div>
          <div className={css.other}>
            <h2>Other</h2>
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