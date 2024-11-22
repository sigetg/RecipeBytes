import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { recipeData } from "../data/recipeData";
import { ingredients } from "../data/ingredients";
import { IngredientsIcon, TipsIcon, SubstitutionIcon } from "../assets/icons";
import { Link } from "react-router-dom/dist";
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
    <Box sx={{ padding: "30px" }}>
      <div className="title-container">
        <Typography variant="h4" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive", paddingBottom: "10px" }} >
            {recipe.title}
        </Typography>
        <span className="recipe-time">
          Prep Time: {recipe.additional_info.prep_time}
        </span>
        <span className="recipe-time">
          Cook Time: {recipe.additional_info.cook_time}
        </span>
        <span className="recipe-time">
          Total Time: {recipe.additional_info.total_time}
        </span>
        <br/>
        <Link
            className="navigation"
            to={`/recipe/${encodeURIComponent(recipe.title)}/start`}
            style={{
                textDecoration: "none",
                backgroundColor: "#306CA3",
                color: "white",
                padding: "5px 20px",
                display: "inline-block",
                textAlign: "center",
                fontSize: "15px",
                marginTop: "10px"
            }}
            >
            START
        </Link>
      </div>
      <div className="container-content">
        <div id="ingredient-container">
            <Typography variant="h4" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", padding: "10px 0" }}>
                    <IngredientsIcon />
                    Ingredients
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
                    <div>
                        {item.quantity} {item.name.toLowerCase()}
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <div id="recipe-tips-container">
            <Typography variant="h4" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center",  padding: "10px 0" }}>
                    <TipsIcon />
                    Recipe Tips
                </Box>
            </Typography>
            <ul style={{ listStyleType: 'none' }}>
                {recipe.additional_info?.tips?.map((item, index) => (
                    <p>{item}</p>
                ))}
            </ul>

        </div>
        <div id="substitutes-container">
            <Typography variant="h4" sx={{ marginBottom: "10px", fontFamily: "'Patrick Hand SC', cursive", }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center",  padding: "10px 0" }}>
                    <SubstitutionIcon />
                    Substitutes
                </Box>
            </Typography>
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
