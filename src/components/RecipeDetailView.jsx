import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { recipeData } from "../data/recipeData";
import { ingredients } from "../data/ingredients";
import { Link } from "react-router-dom";
import { IngredientsIcon, TipsIcon, SubstitutionIcon } from "../assets/icons";
import "../styles/RecipeDetails.css"

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
    <Box sx={{ margin: "3%" }}>
      <div className="title">
        <Typography variant="h4" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive", color:"#699FD0" }} >
            {recipe.title}
        </Typography>
        <div className="time-info">
          <span className="recipe-time">
            Prep Time: {recipe.additional_info.prep_time}
          </span>
          <span className="recipe-time">
            Cook Time: {recipe.additional_info.cook_time}
          </span>
          <span className="recipe-time">
            Total Time: {recipe.additional_info.total_time}
          </span>
        </div>
        <Link
          className="navigation"
          to={`/recipe/${encodeURIComponent(recipe.title)}/1`}
          aria-label={`Start the walkthrough for ${recipe.title}`}
        >
          START
        </Link>
      </div>
      <div className="content-container">
        <div id="ingredient-container">
            <Box sx={{ display: "flex", alignItems: "stretch", gap: "10px", justifyContent: "center",  padding: "10px 0", color:"#699FD0" }}>
              <IngredientsIcon />
              <Typography variant="h5" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
                Ingredients
              </Typography>
            </Box>
            <ul style={{ listStyleType: "none"}}>
                {recipe.ingredients.map((item, index) => (
                <li key={index} style={{display:"flex", alignItems: "center", margin: "20px 0", gap: "10px"}}>
                    <input
                    type="checkbox"
                    checked={isInPantry(item.name)}
                    disabled
                    />
                    <div>
                        {item.quantity} {item.name.toLowerCase()}
                    </div>
                </li>

                ))}
                
            </ul>
        </div>
        <div id="recipe-tips-container">
          <Box sx={{ display: "flex", alignItems: "stretch", gap: "10px", justifyContent: "center",  padding: "10px 0", color:"#699FD0" }}>
            <TipsIcon />
            <Typography variant="h5" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
              Recipe Tips
            </Typography>
          </Box>
          <ul style={{ SlistStyleType: 'none' }}>
              {recipe.additional_info?.tips?.map((item, index) => (
                  <p>{item}</p>
              ))}
          </ul>

        </div>
        <div id="substitutes-container">
          <Box sx={{ display: "flex", alignItems: "stretch", gap: "10px", justifyContent: "center",  padding: "10px 0" }}>
            <SubstitutionIcon />
            <Typography variant="h5" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
              Substitutes
            </Typography>
          </Box>
        </div>
      </div>
      
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
