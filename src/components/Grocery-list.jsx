import React from "react";
import './../styles/Grocery-list.css';


const GroceryList = () => {
    return (
        <body>
        <main class="container">
          <h1 class="header">Groceries</h1>
          <button type="button" class="button header">⨁ New Item</button>
          <section class="grocery">
            <div class="produce">
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
            <div class="protein">
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
            <div class="dairy">
              <h2>Dairy</h2>
            </div>
            <div>
              <div class="grains">
                <h2>Grains</h2>
              </div>
              <div class="other">
                <h2>Other</h2>
              </div>
            </div>
          </section>
        </main>
      </body>
    )
}      
export default GroceryList;