import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { recipeData } from "../data/recipeData";

export default function CurrentWalkthrough() {
    const { title, stepIndex } = useParams();
    const [currentIndex, setCurrentIndex] = useState(parseInt(stepIndex, 10) - 1);
    const navigate = useNavigate();
    const recipe = recipeData.find((r) => r.title === decodeURIComponent(title));

    if (!recipe) {
        return (
            <Box sx={{ padding: "20px" }}>
                <Typography variant="h6" color="error">
                    Recipe not found.
                </Typography>
            </Box>
        );
    }

    const totalInstructions = recipe.instructions.length;

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            navigate(`/recipe/${encodeURIComponent(recipe.title)}/step${newIndex + 1}`);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < totalInstructions - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            navigate(`/recipe/${encodeURIComponent(recipe.title)}/step${newIndex + 1}`);
        }
    };

    const highlightIngredients = (instruction, ingredients) => {
        if (!ingredients?.length) return instruction;

        // Create regex patterns for ingredients
        const ingredientPatterns = ingredients.map((ingredient) => {
            const normalized = ingredient.name.toLowerCase();
            return {
                ...ingredient,
                pattern: new RegExp(
                    `\\b(${normalized.replace(/white|ground|powdered/g, "").trim()})\\b`,
                    "gi"
                ),
            };
        });

        // Split the instruction into words and highlight matches
        return instruction.split(/\b/).map((word, index) => {
            const matchedIngredient = ingredientPatterns.find(({ pattern }) =>
                word.match(pattern)
            );

            if (matchedIngredient) {
                return (
                    <span
                        key={index}
                        style={{ fontWeight: "bold", cursor: "pointer", color: "#306CA3" }}
                        title={`${matchedIngredient.quantity} ${matchedIngredient.name}`}
                    >
                        {word}
                    </span>
                );
            }

            return <span key={index}>{word}</span>;
        });
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography
                variant="h4"
                sx={{ fontFamily: "'Patrick Hand SC', cursive", marginBottom: "20px" }}
            >
                {recipe.title}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Step {currentIndex + 1} of {totalInstructions}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                {highlightIngredients(recipe.instructions[currentIndex], recipe.ingredients)}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                    disabled={currentIndex === totalInstructions - 1}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}
