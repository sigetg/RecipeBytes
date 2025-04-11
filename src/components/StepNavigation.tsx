import React from "react";
import { Box, Button } from "@mui/material";

interface StepNavigationProps {
  currentIndex: number;
  instructionsLength: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}


// Renders the navigation buttons for stepping backward or forward in CurrentWalkthrough.
export default function StepNavigation({
  currentIndex,
  instructionsLength,
  handlePrevClick,
  handleNextClick,
}: StepNavigationProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "auto",
        padding: "10px 0",
        gap: "10px",
      }}
    >
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
        disabled={currentIndex === instructionsLength - 1}
      >
        Next
      </Button>
    </Box>
  );
}
