import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

const ScrapeRecipeForm = () => {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setRecipe(null);

    const functions = getFunctions();
    const scrapeRecipe = httpsCallable(functions, "scrapeRecipe");

    try {
      const result = await scrapeRecipe({ url });
      setRecipe(result.data);
    } catch (err) {
      setError("Failed to scrape the recipe. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Recipe Scraper</h1>
      <input
        type="text"
        placeholder="Enter recipe URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleScrape}>Scrape Recipe</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipe && (
        <div>
          <h2>{recipe.title}</h2>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ScrapeRecipeForm;
