// File: /src/components/CurrentWalkthrough.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import css from "./../styles/CurrentWalkthrough.module.css";

// Child components:
import StepContent from "./StepContent";
import StepNavigation from "./StepNavigation";

/** Route params: "/recipe/:id/step:stepIndex" */
interface RecipeParams {
  id: string;
  stepIndex: string;
  [key: string]: string | undefined; // This makes it extend Record<string, string | undefined>
}

export interface StepIngredient {
  name: string;
}

export interface Instruction {
  step: string;
  ingredients: StepIngredient[];
  // Add more fields if needed (like "equipment", "number", etc.)
}

/** Minimal shape for each ingredient in extendedIngredients. */
export interface Ingredient {
  name: string;
  original: string;
  // Add more fields if needed
}

/**
 * AnalyzedInstructions endpoint returns an array of objects,
 * each with an optional steps array.
 */
interface AnalyzedInstruction {
  steps?: Instruction[];
}

/**
 * RecipeInformation endpoint returns an object that can include extendedIngredients.
 */
interface RecipeInformation {
  extendedIngredients?: Ingredient[];
}

export default function CurrentWalkthrough() {
  const { id, stepIndex } = useParams<RecipeParams>();
  const navigate = useNavigate();

  // Local state
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const parsedIndex = parseInt(stepIndex ?? "", 10);
    return isNaN(parsedIndex) || parsedIndex <= 0 ? 0 : parsedIndex - 1;
  });
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [ingredientDetails, setIngredientDetails] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  // API URLs
  const INSTRUCTIONS_API_URL = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`;
  const INGREDIENTS_API_URL = `https://api.spoonacular.com/recipes/${id}/information`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1) Fetch the analyzed instructions
        const instructionsRes = await axios.get<AnalyzedInstruction[]>(
          INSTRUCTIONS_API_URL,
          {
            //what does this return?
            params: { apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY },
          }
        );
        const steps = instructionsRes.data[0]?.steps ?? [];
        setInstructions(steps);

        // 2) Fetch the recipe info (which includes extendedIngredients)
        const ingredientsRes = await axios.get<RecipeInformation>(
          INGREDIENTS_API_URL,
          {
            params: { apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY },
          }
        );
        const extIngredients = ingredientsRes.data.extendedIngredients ?? [];
        setIngredientDetails(extIngredients);

        setError(null);
      } catch (err) {
        setError("Failed to fetch recipe data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, INSTRUCTIONS_API_URL, INGREDIENTS_API_URL]);

  // Navigation handlers
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

  // Conditional rendering
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

  // The current step object (fallback if index is out of range, though your code ensures it usually isn't)
  const currentStep = instructions[currentIndex] ?? {
    step: "No step information available.",
    ingredients: [],
  };

  return (
    <Box className={css.container}>
      <StepContent
        currentIndex={currentIndex}
        instructionsLength={instructions.length}
        currentStep={currentStep}
        ingredientDetails={ingredientDetails}
        showTimer={showTimer}
        setShowTimer={setShowTimer}
      />

      <StepNavigation
        currentIndex={currentIndex}
        instructionsLength={instructions.length}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />
    </Box>
  );
}
