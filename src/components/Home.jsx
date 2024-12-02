import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import css from "../styles/Home.module.css";
import { getAuth } from "firebase/auth";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
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

    fetchSuggestions();
  }, [favorites]);

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
          <Box className={css.sectionHeader}>
            <Typography className={css.sectionTitle} variant="h5" sx={{fontFamily:"'Patrick Hand SC', cursive", color:"black"}}>
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
                      sx={{fontFamily:"'Patrick Hand SC', cursive", color:"black"}}
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
            sx={{ marginTop: "20px", backgroundColor: "rgba(48, 108, 163, 0.52)", width: "200px" }}
          >
            See More Recipes
          </Button>
        </div>

        {/* Favorites Section */}
        <div className={css.favoritesContainer}>
          <Box className={css.sectionHeader}>
            <StarIcon />
            <Typography className={css.sectionTitle} variant="h5" sx={{fontFamily:"'Patrick Hand SC', cursive", color:"black"}}>
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
                <div className={css.favoriteInfo}>
                  <Typography 
                    className={css.favoritesTitle} 
                    variant="h5"
                    sx={{fontFamily:"'Patrick Hand SC', cursive", color:"rgba(48, 108, 163, 0.82)"}}
                  >
                    {recipe.title}
                  </Typography>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Expiration Section */}
        <div className={css.expirationContainer}>
          <Box className={css.sectionHeader}>
            <AccessTimeIcon />
            <Typography className={css.sectionTitle} variant="h5"  sx={{fontFamily:"'Patrick Hand SC', cursive", color:"black"}}>
              Expiration Coming Up
            </Typography>
          </Box>
        </div>
      </div>
    </Box>
  );
}
