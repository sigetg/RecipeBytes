import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import css from "../styles/Home.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from "@mui/icons-material/Star";
import { IngredientsIcon } from "../assets/icons";
import { recipeData } from "../data/recipeData";
import { Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';


export default function Home() {
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <Box className={css.pageContainer}>
            <div className={css.titleContainer}>
                <AccountCircleIcon className={css.icon} />
                <Typography className={css.welcomeText} variant="h4">
                    Welcome {user.displayName ? user.displayName.split(' ')[0] : ""}!
                </Typography>
            </div>
            <div className={css.containerContent}>
                <div className={css.recipeSuggestionContainer}>
                    <Box className={css.sectionHeader}>
                        <IngredientsIcon />
                        <Typography className={css.sectionTitle} variant="h5">
                            Recipes You Might Like
                        </Typography>
                    </Box>
                    {recipeData.filter((recipe) => !recipe.is_favorite) 
                        .map((recipe) => (
                            <Link
                                to={`/recipe/${encodeURIComponent(recipe.title)}`}
                                key={recipe.title}
                                className={css.recipeLink}
                            >
                                <div className={css.recipeCardHome} key={recipe.title}>
                                    <img
                                        className={css.recipeImage}
                                        src={recipe.image}
                                        alt={recipe.title}
                                    />
                                    <div className={css.recipeInfo}>
                                        <Typography
                                            className={css.recipeTitle}
                                            variant="h5"
                                        >
                                            {recipe.title}
                                        </Typography>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                <div className={css.favoritesContainer}>
                    <Box className={css.sectionHeader}>
                        <StarIcon /> 
                        <Typography className={css.sectionTitle} variant="h5">
                            Favorites
                        </Typography>
                    </Box>
                    {recipeData.filter((recipe) => recipe.is_favorite) 
                        .map((recipe) => (
                            <Link
                                to={`/recipe/${encodeURIComponent(recipe.title)}`}
                                key={recipe.title}
                                className={css.recipeLink}
                            >
                                <div className={css.favoriteCard} key={recipe.title}>
                                    <div className={css.favoriteInfo}>
                                        <Typography
                                            className={css.favoriteTitle}
                                            variant="h6"
                                        >
                                            {recipe.title}
                                        </Typography>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                <div className={css.expirationContainer}>
                    <Box className={css.sectionHeader}>
                        <AccessTimeIcon /> 
                        <Typography className={css.sectionTitle} variant="h5">
                            Expiration Coming Up
                        </Typography>
                    </Box>
                </div>
            </div>
        </Box>
    );
}
