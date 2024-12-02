import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import css from "./../styles/CurrentWalkthrough.module.css";
import bakingGif from "./../assets/Baking.gif";
import mixGif from "./../assets/Mix.gif";
import sauteGif from "./../assets/Saute.gif";
import dicingGif from "./../assets/Dicing.gif";

export default function CurrentWalkthrough() {
  const { id, stepIndex } = useParams();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const index = parseInt(stepIndex, 10);
    return isNaN(index) ? 0 : index - 1;
  });
  const [instructions, setInstructions] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const INSTRUCTIONS_API_URL = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`;
  const INGREDIENTS_API_URL = `https://api.spoonacular.com/recipes/${id}/information`;

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);

        // Fetch step instructions
        const instructionsResponse = await axios.get(INSTRUCTIONS_API_URL, {
          params: { apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY },
        });
        setInstructions(instructionsResponse.data[0]?.steps || []);

        // Fetch full ingredient details
        const ingredientsResponse = await axios.get(INGREDIENTS_API_URL, {
          params: { apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY },
        });
        setIngredientDetails(ingredientsResponse.data.extendedIngredients || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recipe data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      navigate(`/recipe/${id}/step${newIndex + 1}`);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < instructions.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      navigate(`/recipe/${id}/step${newIndex + 1}`);
    }
  };

  const findIngredientAmount = (stepIngredients) => {
    return stepIngredients.map((stepIngredient) => {
      const match = ingredientDetails.find((ingredient) =>
        ingredient.name.toLowerCase().includes(stepIngredient.name.toLowerCase())
      );
      return match ? match.original : null;
    });
  };

  const getAnimationForStep = (instruction) => {
    if (/bake|roast|oven/i.test(instruction)) return bakingGif;
    if (/mix|stir|whisk|beat/i.test(instruction)) return mixGif;
    if (/saute|fry|heat/i.test(instruction)) return sauteGif;
    if (/dice|chop|slice/i.test(instruction)) return dicingGif;
    return null; // No matching animation
  };

  if (loading) {
    return (
      <Box className={css.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={css.container}>
        <Typography className={css.errorText}>{error}</Typography>
      </Box>
    );
  }

  if (!instructions.length) {
    return (
      <Box className={css.container}>
        <Typography variant="h6" color="textSecondary">
          No instructions available for this recipe.
        </Typography>
      </Box>
    );
  }

  const currentStep = instructions[currentIndex] || {
    step: "No step information available.",
    ingredients: [],
  };

  const matchedIngredients = findIngredientAmount(currentStep.ingredients);
  const animation = getAnimationForStep(currentStep.step);

  return (
    <Box className={css.container}>
      <div className={css.sectionHeader}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Patrick Hand SC', cursive",
            marginBottom: "10px;",
          }}
        >
          Step {currentIndex + 1} of {instructions.length}
        </Typography>

        {matchedIngredients.filter(Boolean).length > 0 && (
          <Box className={css.ingredientsList}>
            <Typography
              variant="h6"
              className={css.ingredientsTitle}
              sx={{ fontFamily: "'inter', serif" }}
            >
              Ingredients in this step:
            </Typography>
            <ul>
              {matchedIngredients
                .filter(Boolean)
                .map((ingredient, index) => (
                  <li
                    key={index}
                    className={css.ingredientsItem}
                    sx={{ fontFamily: "'inter', serif" }}
                  >
                    {ingredient}
                  </li>
                ))}
            </ul>
          </Box>
        )}
      </div>

      {/* Animation for Step */}
      {animation && (
        <Box className={css.animationContainer}>
          <img
            src={animation}
            alt="Step Animation"
            className={css.stepAnimation}
          />
        </Box>
      )}

      <div className={css.instruction}>
        <Typography
          variant="h4"
          sx={{ fontFamily: "'Patrick Hand SC', cursive", padding: "10px 0" }}
        >
          {currentStep.step}
        </Typography>
      </div>

      <Box className={css.navigationButtons}>
        <Button
          variant="contained"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextClick}
          disabled={currentIndex === instructions.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
