import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import css from "../styles/RecipeList.module.css";
import axios from "axios";
import { Widgets } from "@mui/icons-material";

const SearchBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
  backgroundColor: "#E2F0FC",
  padding: "10px 20px",
  borderRadius: "30px",
  maxWidth: "400px",
  margin: "0 auto",
}));

const SearchInput = styled("input")({
  flexGrow: 1,
  border: "none",
  outline: "none",
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "transparent",
});

export default function RecipeList() {
  const [searchQuery, setSearchQuery] = useState("");
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
            number: 20,
            addRecipeInformation: true,
          },
        });

        // Filter suggestions to exclude favorites
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
  }, [favorites]); // Re-fetch suggestions when favorites change

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const saveToFavorites = (recipe) => {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipeId) => favorites.some((fav) => fav.id === recipeId);

  return (
    <Box
      sx={{
        padding: "30px",
        height: "auto",
        alignContent: "center",
        display: "block",
        marginTop: "5vh",
      }}
    >
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search…"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchIcon />
      </SearchBar> 

      {/* Favorites Section */}
      <Box>
        <Typography
          className={css.heading}
          variant="h4"
          sx={{
            margin: "3vh 0 10px 0",
            fontFamily:"'Patrick Hand SC'",
            color: "rgba(48, 108, 163, 0.52)",
          }}
        >
          <StarIcon className={css.headingIcon} />
          Favorites
        </Typography>
        <div className={css.recipeContainer}>
          {!favorites.length && (
            <Typography className={css.noResults} variant="body1">
              No favorite recipes found.
            </Typography>
          )}
          {favorites.map((recipe) => (
            <div className={css.recipeCard} key={recipe.id}>
              <Link
                to={`/recipe/${recipe.id}`}
                className={css.recipeLink}
                style={{width:"100%"}}
              >
                <img
                  className={css.recipeImage}
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
              <div className={css.recipeInfo}>
                <Typography
                  className={css.recipeTitle}
                  variant="h4"
                  sx={{fontFamily:"'Patrick Hand SC', cursive"}}
                >
                  {recipe.title}
                </Typography>
                <button
                  className={css.favoriteButton}
                  onClick={() => removeFromFavorites(recipe.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      </Box>

      {/* Suggestions Section */}
      <Box>
        <Typography
          className={css.heading}
          variant="h4"
          sx={{
            margin: "3vh 0 10px 0",
            fontFamily:"'Patrick Hand SC'",
            color: "rgba(48, 108, 163, 0.52)",
          }}
        >
          Suggestions
        </Typography>
        <div className={css.recipeContainer}>
          {loading && <CircularProgress />}
          {error && <Typography className={css.errorMessage}>{error}</Typography>}
          {suggestions.map((recipe) => (
            <div className={css.recipeCard} key={recipe.id}>
              <Link
                to={`/recipe/${recipe.id}`}
                className={css.recipeLink}
                style={{width:"100%"}}
              >
                <img
                  className={css.recipeImage}
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
              <div className={css.recipeInfo}>
                <Typography
                  className={css.recipeTitle}
                  variant="h4"
                  sx={{fontFamily:"'Patrick Hand SC', cursive"}}
                >
                  {recipe.title}
                </Typography>
                {isFavorite(recipe.id) ? (
                  <button
                    className={css.favoriteButton}
                    onClick={() => removeFromFavorites(recipe.id)}
                  >
                    Remove from Favorites
                  </button>
                ) : (
                  <button
                    className={css.favoriteButton}
                    onClick={() => saveToFavorites(recipe)}
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}
