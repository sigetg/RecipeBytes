import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { recipeData } from "../data/recipeData";

export default function RecipeDetailView() {
  const { title } = useParams(); // Get the recipe title from the URL
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

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        {recipe.title}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Ingredients:
      </Typography>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>
            {item.quantity} {item.name}
          </li>
        ))}
      </ul>
      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px" }}>
        Instructions:
      </Typography>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </Box>
  );
}
