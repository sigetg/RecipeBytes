import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import StepTimer from "./Timer"; // Your existing Timer component
import { Instruction, Ingredient, StepIngredient} from "./CurrentWalkthrough";
import bakingGif from "./../assets/Baking.gif";
import mixGif from "./../assets/Mix.gif";
import sauteGif from "./../assets/Saute.gif";
import dicingGif from "./../assets/Dicing.gif";
import css from "./../styles/CurrentWalkthrough.module.css";

interface StepContentProps {
  currentIndex: number;
  instructionsLength: number;
  currentStep: Instruction;
  ingredientDetails: Ingredient[];
  showTimer: boolean;
  setShowTimer: Dispatch<SetStateAction<boolean>>;
}

/** StepContent handles:
 *  - Displaying the current step text
 *  - Listing matched ingredients
 *  - Animations based on step text
 *  - Step timer toggle
 */
export default function StepContent({
  currentIndex,
  instructionsLength,
  currentStep,
  ingredientDetails,
  showTimer,
  setShowTimer
}: StepContentProps) {

  // 1) Helper: find the "original" amounts for each step ingredient
  const findIngredientAmount = useCallback(
    (stepIngredients: StepIngredient[]): Array<string | null> => {
      return stepIngredients.map((stepIngredient) => {
        const match = ingredientDetails.find((ing) =>
          ing.name.toLowerCase().includes(stepIngredient.name.toLowerCase())
        );
        return match ? match.original : null;
      });
    },
    [ingredientDetails]
  );

  // 2) Helper: return the path to the correct GIF based on key words
  const getAnimationForStep = (instruction: string): string | null => {
    if (/bake|roast|oven/i.test(instruction)) return bakingGif;
    if (/mix|stir|whisk|beat/i.test(instruction)) return mixGif;
    if (/saute|fry|heat/i.test(instruction)) return sauteGif;
    if (/dice|chop|slice/i.test(instruction)) return dicingGif;
    return null;
  };

  // 3) Helper: extract time in seconds from the step string
  const getTimeFromStep = (instruction: string): number | null => {
    const timeMatch = instruction.match(/(\d+)\s*(minutes|minute|seconds|second)/i);
    if (timeMatch) {
      const timeValue = parseInt(timeMatch[1]);
      return timeMatch[2].toLowerCase().includes("second") ? timeValue : timeValue * 60;
    }
    return null;
  };

  // Evaluate matched ingredients, animation, step time
  const matchedIngredients = findIngredientAmount(currentStep.ingredients).filter(Boolean);
  const animation = getAnimationForStep(currentStep.step);
  const stepTime = getTimeFromStep(currentStep.step);

  return (
    <div className={css.mainContent}>
      <div className={css.sectionHeader}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Patrick Hand SC', cursive",
            fontSize: { xs: "25px", md: "30px" },
          }}
        >
          Step {currentIndex + 1} of {instructionsLength}
        </Typography>
      </div>

      {matchedIngredients.length > 0 && (
        <Box className={css.ingredientsList}>
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontFamily: "inter, sans-serif",
            }}
          >
            Ingredients in this step:
          </Typography>
          <ul>
            {matchedIngredients.map((ingredient, index) => (
              <li
                key={index}
                className={css.ingredientsItem}
                style={{ fontSize: "14px" }}
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </Box>
      )}

      {animation && (
        <Box className={css.animationContainer}>
          <img src={animation} alt="Step Animation" className={css.stepAnimation} />
        </Box>
      )}

      <div className={css.instruction}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Patrick Hand SC', cursive",
            padding: "10px 0",
            fontSize: { xs: "20px", md: "24px" },
          }}
        >
          {currentStep.step}
        </Typography>
      </div>

      {stepTime && (
        <IconButton
          onClick={() => setShowTimer((prev) => !prev)}
          sx={{
            position: "fixed",
            top: "90px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: showTimer ? "rgba(48, 108, 163, 0.72)" : "white",
            color: showTimer ? "white" : "rgba(48, 108, 163, 0.72)",
            "&:hover": {
              backgroundColor: "rgba(48, 108, 163, 0.62)",
            },
          }}
        >
          <TimerIcon />
        </IconButton>
      )}

      {showTimer && stepTime && (
        <Box
          sx={{
            position: "fixed",
            top: "100px",
            right: "10px",
            zIndex: 1000,
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <StepTimer
            defaultTimeInSeconds={stepTime}
            onTimerComplete={() => alert("Time's up for this step!")}
          />
        </Box>
      )}
    </div>
  );
}
