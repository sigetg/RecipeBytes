import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getData, addData, deleteData, getSingleData } from "../services/firestoreService";
import css from './../styles/PantryList.module.css';
import Button from '@mui/material/Button';
import { catagories } from "../data/catagory";


const PantryList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState("other");
  const [expiration, setExpiration] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchIngredients = async () => {
      const fetchedIngredients = await getData(user.uid, 'pantry');
      setIngredients(fetchedIngredients);
    };

    const setDate = () => {
      const intervalId = setInterval(() => {
        setCurrentDate(new Date()); // Update current date every hour
      }, 3600000); // Update every hour

      return () => clearInterval(intervalId); // Cleanup on unmount
    };

    setDate();
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
      await deleteData(user.uid, 'pantry', id);
    }
    const updatedIngredients = await getData(user.uid, 'pantry');
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
    await addData(user.uid, 'pantry', newIngredient);
    setShowForm(false);
    setTitle("");
    setQuantity(0);
    setCategory("produce");
    setExpiration("");
    const updatedIngredients = await getData(user.uid, 'pantry');
    setIngredients(updatedIngredients);
  };

  const addSelectedToGrocery = async () => {
    if (user) {
      for (const id of selectedItems) {
        // Get the item from the pantry collection
        const item = await getSingleData(user.uid, 'pantry', id);
        // Add the item to the grocery collection
        const newIngredient = {
          title: item.title,
          quantity: item.quantity,
          category: item.category,
          expiration: item.expiration
        };
        await addData(user.uid, 'grocery', newIngredient);
      }
      setSelectedItems([]);
    }
  };

  function getDaysLeft(expiration, current) {
    const answer = Math.ceil((expiration - current)/(1000 * 60 * 60 * 24));
    return answer;
  }

  const toggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

// Maybe refactor to implement this later...
  // const Pantrytem = ({ name }) => (
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

  // const calculateDaysLeft = () => {
  //   const differenceInMs = expiration - currentDate;
  //   const differenceInDays = Math.ceil((ingredient.expiration.seconds - currentDate.getMilliseconds()) / (1000 * 60 * 60 * 24));
  //   setDaysLeft(differenceInDays);
  // }


  // a failed attempt to change label color based on value
  // const setSpanLabelColor = ({ingredient}) => {
  //   console.log("hi");
  //   const expirationSpan = document.getElementByClassName('expirationLabel');
  //   console.log("expiration span" + expirationSpan);
  //   const date_diff = Math.ceil((ingredient.expiration.toDate().valueOf() - currentDate.valueOf())/(1000 * 60 * 60 * 24));
  //   if (date_diff === 1) {
  //     ingredient.expirationSpan.style.backgroundColor = 'red';
  //   } 
  //   setSpanColor()
  // }

  function generateItemWithLabel(ingredient) {
    if (getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf()) <= 0) {
      return <>
        <span className={`${css.expirationLabel} ${css.expired}`}>EXPIRED</span>
      </>
    }
    else if (getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf()) <= 4) {
      return <>
        <span className={`${css.expirationLabel} ${css.soonToExpire}`}>expires in {getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf())} days</span>
      </>
    }
    else {
      return <><span className={css.expirationLabel}>expires in {getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf())} days</span></>
    } 
  }


  const PantryCategory = ({ name, ingredients }) => (
    <div className={`${css[name.toLowerCase()]} ${(name === "grain" || name === "other") ? css.smallColumn : ""}`}>
      <h2>{name}</h2>
      {ingredients.filter(ingredient => ingredient.category === name).length > 0 ? (
        <ul>
          {ingredients
            .filter(ingredient => ingredient.category === name)
            .map(ingredient => (
              <li key={ingredient.id}>
                <div><input
                  type="checkbox"
                  name={`${name}${ingredient.id}`}
                  value={ingredient.title}
                  checked={selectedItems.includes(ingredient.id)}
                  onChange={() => handleCheckboxChange(ingredient.id)}
                />
                <label htmlFor={`${name}${ingredient.id}`}>{ingredient.title} ({ingredient.quantity})</label>
                </div>
                {generateItemWithLabel(ingredient)}  

                {/* try to turn this into a function that sets item with <= 0 days left as expired and change the tag based on how many days are left */}

                <br />
              </li>
            ))}
          </ul>
      ) : (
        <p>No items yet. Click 'New Item' to add one now!</p>
      )}
    </div>
  );

    return (
      <body className="pantry-body">
        <main className={css.container}>
        <div className={css.header}>
          <h1>Pantry Tracker</h1>
          <Button variant="text" href="#outlined-buttons" onClick={handleDeleteSelected} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
            Delete Selected
          </Button>
          <Button variant="text" href="#outlined-buttons" onClick={addSelectedToGrocery} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
            Add Selected to Grocery List
          </Button>
          <Button variant="text" href="#outlined-buttons" onClick={toggleForm} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18}}>
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
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                value={category}
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
            <button type="submit" className="button">Add Pantry Item</button>
          </form>
        )}

        </div>
        <section className={css.pantry}>
          {catagories.map((category) => (
              <PantryCategory key={category.name} name={category.name} ingredients={ingredients} />
            ))}
        </section>
      </main>
    </body>
    )
}
export default PantryList;