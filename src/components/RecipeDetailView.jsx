import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { recipeData } from "../data/recipeData";
import { ingredients } from "../data/ingredients";
import { IngredientsIcon } from "../assets/icons";

export default function RecipeDetailView() {
  const { title } = useParams(); 
  const recipe = recipeData.find(
    (r) => r.title === decodeURIComponent(title)
  );

  if (!recipe) {
    return (
      <Box sx={{ padding: "30px" }}>
        <Typography variant="h4">Recipe Not Found</Typography>
      </Box>
    );
  }

  const isInPantry = (ingredientName) => {
    return ingredients.some((pantryItem) =>
      pantryItem.name.toLowerCase() === ingredientName.toLowerCase()
    );
  };

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }} >
        {recipe.title}
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
        <IngredientsIcon />
        Ingredients:
      </Box>
      </Typography>
      <ul style={{ listStyleType: "none"}}>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={isInPantry(item.name)}
              disabled
            />
            {item.quantity} {item.name}
          </li>
        ))}
      </ul>
      {/* <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px" }}>
        Instructions:
      </Typography>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol> */}
    </Box>
  );
}
