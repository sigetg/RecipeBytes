import * as React from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";
import { recipeData } from "../data/recipeData";
import { Link } from "react-router-dom";
import "../styles/RecipeList.css";


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
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };


  const filteredFavorites = recipeData.filter(
    (recipe) =>
      recipe.is_favorite &&
      recipe.title.toLowerCase().includes(searchQuery)
  );

  const filteredSuggestions = recipeData.filter(
    (recipe) =>
      !recipe.is_favorite &&
      recipe.title.toLowerCase().includes(searchQuery)
  );

  return (
    <Box sx={{ padding: "30px", height:"auto", alignContent:"center", display: "block", marginTop: "5vh" }}>
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
        {filteredFavorites.length === 0 && (
          <Typography variant="body1" sx={{ color: "#666" }}>
            No favorite recipes found.
          </Typography>
        )}
        {filteredFavorites.map((recipe) => (
          <Link 
            to={`/recipe/${encodeURIComponent(recipe.title)}`}
            key={recipe.title}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="recipe-card" key={recipe.title}>
              <img
                className="recipe-image"
                src={recipe.image}
                alt={recipe.title}
                style={{ paddingBottom:"10px", width: "100%", height:"200px" }}
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
                <Typography
                  variant="body1"
                  sx={{ color: "#666", textAlign: "left" }}
                >
                  <strong>Ingredients:</strong>{" "}
                  {recipe.ingredients
                    .map((item) => `${item.quantity} ${item.name}`)
                    .slice(0, 5)
                    .join(", ")}{" "}
                  ...
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
        {filteredSuggestions.map((recipe) => (
          <Link 
            to={`/recipe/${encodeURIComponent(recipe.title)}`}
            key={recipe.title}
            style={{ textDecoration: "none", color: "inherit"}}
          >
            <div className="recipe-card" key={recipe.title}>
              <img
                className="recipe-image"
                src={recipe.image}
                alt={recipe.title}
                style={{ paddingBottom:"10px", width: "100%", height:"200px"}}
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
                <Typography
                  variant="body1"
                  sx={{ color: "#666", textAlign: "left" }}
                >
                  <strong>Ingredients:</strong>{" "}
                  {recipe.ingredients
                    .map((item) => `${item.quantity} ${item.name}`)
                    .slice(0, 5)
                    .join(", ")}{" "}
                  ...
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
