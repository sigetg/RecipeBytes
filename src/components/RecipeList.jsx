import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/RecipeList.css";
import axios from "axios";

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
  const [favorites, setFavorites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            number: 10, 
            addRecipeInformation: true,
            sort: "popularity",
          },
        });
        setFavorites(response.data.results || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch favorites");
        setLoading(false);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            query: searchQuery, // Use search query to fetch suggestions
            number: 20, // Limit the number of suggestions
            addRecipeInformation: true,
          },
        });
        setSuggestions(response.data.results || []);
      } catch (err) {
        setError("Failed to fetch suggestions");
      }
    };

    fetchFavorites(); // Load favorites initially
    if (searchQuery) fetchSuggestions(); // Fetch suggestions only on search
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ padding: "30px", height: "auto", alignContent: "center", display: "block", marginTop: "5vh" }}>
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
          variant="h4"
          sx={{
            margin: "3vh 0 10px 0",
            color: "#4a90e2",
            fontFamily: "'Patrick Hand SC', cursive",
            textAlign: "left",
            padding: "10px 0 0 0",
          }}
        >
          <StarIcon sx={{ marginRight: "8px" }} /> Favorites
        </Typography>
        <div className="recipe-container">
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && favorites.length === 0 && (
            <Typography variant="body1" sx={{ color: "#666" }}>
              No favorite recipes found.
            </Typography>
          )}
          {favorites.map((recipe) => (
            <Link
              to={`/recipe/${encodeURIComponent(recipe.title)}`}
              key={recipe.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="recipe-card">
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ paddingBottom: "10px", width: "100%", height: "200px" }}
                />
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "'Patrick Hand SC', cursive",
                      textAlign: "left",
                      paddingBottom: "15px",
                    }}
                  >
                    {recipe.title}
                  </Typography>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Box>

      {/* Suggestions Section */}
      <Box>
        <Typography
          variant="h4"
          sx={{
            margin: "3vh 0 10px 0",
            color: "#4a90e2",
            fontFamily: "'Patrick Hand SC', cursive",
            textAlign: "left",
            padding: "10px 0 0 0",
          }}
        >
          Suggestions
        </Typography>
        <div className="recipe-container">
          {suggestions.map((recipe) => (
            <Link
              to={`/recipe/${encodeURIComponent(recipe.title)}`}
              key={recipe.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="recipe-card">
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ paddingBottom: "10px", width: "100%", height: "200px" }}
                />
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "'Patrick Hand SC', cursive",
                      textAlign: "left",
                      paddingBottom: "15px",
                    }}
                  >
                    {recipe.title}
                  </Typography>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Box>
    </Box>
  );
}
