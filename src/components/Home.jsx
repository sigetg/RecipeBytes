import React, { useState, useEffect} from "react";
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
import PantryList from './PantryList';
import { getData } from "../services/firestoreService";

export default function Home() {
    const [ingredients, setIngredients] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    useEffect(() => {
        const setDate = () => {
          const intervalId = setInterval(() => {
            setCurrentDate(new Date()); // Update current date every hour
          }, 3600000); // Update every hour
    
          return () => clearInterval(intervalId); // Cleanup on unmount
        };
    
        setDate();
      }, []);

    function getDaysLeft(expiration, current) {
        const answer = Math.ceil((expiration - current)/(1000 * 60 * 60 * 24));
        return answer;
    }


    function get_expiring_items() {
        get_ingredients();
        let expiring_ingredients = [];
        let expired_ingredients = []

        for (let ingredient of ingredients) {
            // console.log(ingredient);
            if (getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf()) <= 0) {
                expired_ingredients.push(ingredient);
            }
            else if (getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf()) <= 4) {
                expiring_ingredients.push(ingredient);
            }
        }
        
        const expiring = () => expiring_ingredients.map((ingredient) => <>
            <div className = {css.expiringItem}>
            <li>{ingredient.title} ({ingredient.quantity})</li>
            <span className={`${css.expirationLabel} ${css.soonToExpire}`}>expires in {getDaysLeft(ingredient.expiration.toDate().valueOf(),currentDate.valueOf())} days</span>
            </div>
            </>);

        const expired = () => expired_ingredients.map((ingredient) => <>
            <div className = {css.expiringItem}>
            <li>{ingredient.title} ({ingredient.quantity})</li>
            <span className={`${css.expirationLabel} ${css.expired}`}>EXPIRED</span>
            </div>
            </>);

        return <>{expired()} {expiring()}</>
    }    
    
    async function get_ingredients() {
        const ingredients = await getData(user.uid, 'pantry');
        setIngredients(ingredients);
    }

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
                        <ul>
                            {get_expiring_items()}
                        </ul>
                    </Box>
                </div>
            </div>
        </Box>
    );
}
