import React from "react";
import css from "../styles/PantryList.module.css";

interface PantryFormProps {
  title: string;
  quantity: number;
  unit: string;
  customUnit: string;
  category: string;
  expiration: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PantryForm: React.FC<PantryFormProps> = ({
  title,
  quantity,
  unit,
  customUnit,
  category,
  expiration,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <div>
        <h2>Add Item</h2>
        <label htmlFor="title">Item: </label>
        <input id="title" value={title} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input id="quantity" type="number" min="0" value={quantity} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <select id="category" value={category} onChange={onChange} required>
          <option value="produce">Produce</option>
          <option value="protein">Protein</option>
          <option value="dairy">Dairy</option>
          <option value="grain">Grains</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="unit">Unit:</label>
        <select id="unit" value={unit} onChange={onChange} required>
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
        </select>
        {unit === "other" && (
          <input
            type="text"
            id="customUnit"
            value={customUnit}
            onChange={onChange}
            placeholder="Enter custom unit"
            required
          />
        )}
      </div>
      <div>
        <label htmlFor="expiration">Expiration Date: </label>
        <input type="date" id="expiration" value={expiration} onChange={onChange} required />
      </div>
      <button type="submit" className="button">
        Add Pantry Item
      </button>
    </form>
  );
};

export default PantryForm;