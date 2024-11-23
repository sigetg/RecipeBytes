import React from "react";
import css from './../styles/PantryList.module.css';


const PantryList = () => {
    return (
        <body>
        <main className={css.container}>
          <h1 className={css.header}>Pantry</h1>
          <button type="button" className="button header">⨁ New Item</button>
          <section className="pantry">
            <div className="produce">
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
            <div className="protein">
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
            <div className="dairy">
              <h2>Dairy</h2>
            </div>
            <div>
              <div className="grains">
                <h2>Grains</h2>
              </div>
              <div className="other">
                <h2>Other</h2>
              </div>
            </div>
          </section>
        </main>
      </body>
    )
}      
export default PantryList;