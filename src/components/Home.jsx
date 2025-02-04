import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import css from "../styles/Home.module.css";
import { getAuth } from "firebase/auth";
import { getData } from "../services/firestoreService";

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      return Array.isArray(JSON.parse(storedFavorites))
        ? JSON.parse(storedFavorites)
        : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage:", e);
      return [];
    }
  });

  const [suggestions, setSuggestions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    // Fetch recipes
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            number: 4, // Fetch only 4 suggestions for the home page
            addRecipeInformation: true,
          },
        });

        const filteredSuggestions = response.data.results.filter(
          (recipe) => !favorites.some((fav) => fav.id === recipe.id)
        );

        setSuggestions(filteredSuggestions || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch suggestions");
        setLoading(false);
      }
    };

    // Fetch pantry items
    const fetchIngredients = async () => {
      if (user) {
        const pantryItems = await getData(user.uid, "pantry");
        setIngredients(pantryItems);
      }
    };

    fetchSuggestions();
    fetchIngredients();

    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 3600000); // Update every hour

    return () => clearInterval(intervalId);
  }, [favorites, user]);

  const getDaysLeft = (expiration, current) => {
    return Math.ceil((expiration - current) / (1000 * 60 * 60 * 24));
  };

  const getExpiringItems = () => {
    const expiringIngredients = [];
    const expiredIngredients = [];

    ingredients.forEach((ingredient) => {
      const daysLeft = getDaysLeft(
        ingredient.expiration.toDate().valueOf(),
        currentDate.valueOf()
      );

      if (daysLeft <= 0) {
        expiredIngredients.push(ingredient);
      } else if (daysLeft <= 4) {
        expiringIngredients.push(ingredient);
      }
    });

    const expired = () =>
      expiredIngredients.map((ingredient) => (
        <div key={ingredient.id} className={css.expiringItem}>
          <li>
            {ingredient.title} ({ingredient.quantity})
          </li>
          <span className={`${css.expirationLabel} ${css.expired}`}>
            EXPIRED
          </span>
        </div>
      ));

    const expiring = () =>
      expiringIngredients.map((ingredient) => (
        <div key={ingredient.id} className={css.expiringItem}>
          <li>
            {ingredient.title} ({ingredient.quantity})
          </li>
          <span className={`${css.expirationLabel} ${css.soonToExpire}`}>
            Expires in {getDaysLeft(ingredient.expiration.toDate().valueOf(), currentDate.valueOf())} days
          </span>
        </div>
      ));

    return (
      <>
        {expired()}
        {expiring()}
      </>
    );
  };

  return (
    <Box className={css.pageContainer}>
      <div className={css.titleContainer}>
        <AccountCircleIcon className={css.icon} />
        <Typography className={css.welcomeText} variant="h4">
          Welcome {user?.displayName?.split(" ")[0] || ""}!
        </Typography>
      </div>

      <div className={css.containerContent}>
        {/* Suggestions Section */}
        <div className={css.recipeSuggestionContainer}>
          <Box
            className={css.sectionHeader}
            sx={{
              marginTop: "20px", // Add margin to create spacing
              padding: "10px 0", // Optional: Add padding for better layout
            }}
          >
            <Typography
              className={css.sectionTitle}
              variant="h5"
              sx={{
                fontFamily: "'Patrick Hand SC', cursive",
                color: "black",
              }}
            >
              Recipes You Might Like
            </Typography>
          </Box>

          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography className={css.errorMessage}>{error}</Typography>
          ) : (
            suggestions.map((recipe) => (
              <Link
                to={`/recipe/${recipe.id}`}
                key={recipe.id}
                className={css.recipeLink}
              >
                <div className={css.recipeCardHome}>
                  <img
                    className={css.recipeImage}
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <div className={css.recipeInfo}>
                    <Typography
                      className={css.recipeTitle}
                      variant="h5"
                      sx={{ fontFamily: "'Patrick Hand SC', cursive", color: "black" }}
                    >
                      {recipe.title}
                    </Typography>
                  </div>
                </div>
              </Link>
            ))
          )}
          <Button
            variant="contained"
            onClick={() => navigate("/recipes")}
            sx={{
              marginTop: "20px",
              backgroundColor: "rgba(48, 108, 163, 0.52)",
              width: "200px",
            }}
          >
            See More Recipes
          </Button>
        </div>

        {/* Favorites Section */}
        <div className={css.favoritesContainer}>
          <Box className={css.sectionHeader}>
            <StarIcon />
            <Typography
              className={css.sectionTitle}
              variant="h5"
              sx={{ fontFamily: "'Patrick Hand SC', cursive", color: "black" }}
            >
              Favorites
            </Typography>
          </Box>
          {!favorites.length && (
            <Typography className={css.noResults}>
              No favorite recipes found.
            </Typography>
          )}
          {favorites.slice(0, 4).map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className={css.recipeLink}
            >
              <div className={css.favoriteCard}>
                <Typography
                  className={css.favoritesTitle}
                  variant="h5"
                  sx={{
                    fontFamily: "'Patrick Hand SC', cursive",
                    color: "rgba(48, 108, 163, 0.82)",
                  }}
                >
                  {recipe.title}
                </Typography>
              </div>
            </Link>
          ))}
        </div>

        {/* Expiring Items Section */}
        <div className={css.expirationContainer}>
          <Box className={css.sectionHeader}>
            <AccessTimeIcon />
            <Typography
              className={css.sectionTitle}
              variant="h5"
              sx={{ fontFamily: "'Patrick Hand SC', cursive" }}
            >
              Expiration Coming Up
            </Typography>
          </Box>
          <ul>{getExpiringItems()}</ul>
        </div>
      </div>
    </Box>
  );
}
