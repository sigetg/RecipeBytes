import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import css from "../styles/Home.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from "@mui/icons-material/Star";
import { IngredientsIcon } from "../assets/icons";
import { recipeData } from "../data/recipeData";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Box sx={{ padding: "30px" }}>
            <div className="title-container">
                <AccountCircleIcon sx={{ height: "40px", width: "40px", color: "#306CA3"}} />
                <Typography variant="h4" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive", color: "#306CA3" }} >
                    Welcome Username
                </Typography>
            </div>
            <div className="container-content">
                <div id="recipe-suggestion-container">
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center",  padding: "10px 0", color:"#699FD0" }}>
                    <IngredientsIcon />
                        <Typography variant="h5" sx={{ fontFamily: "'Patrick Hand SC', cursive", }}>
                            Recipes You Might Like
                        </Typography>                      
                    </Box>
                    {recipeData.filter((recipe) => !recipe.is_favorite) 
                            .map((recipe) => (
                                <Link
                                to={`/recipe/${encodeURIComponent(recipe.title)}`}
                                key={recipe.title}
                                style={{ textDecoration: "none", color: "inherit" }}
                                >
                                <div className="recipe-card-home" key={recipe.title}>
                                    <img
                                    className="recipe-image"
                                    src={recipe.image}
                                    alt={recipe.title}
                                    style={{ paddingBottom:"10px", width:"100%" }}
                                    />
                                    <div style={{ flex: 1 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
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
                <div id="favorites-container">
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center",  padding: "10px 0", color:"#699FD0" }}>
                        <StarIcon /> 
                        <Typography variant="h5" sx={{ fontFamily: "'Patrick Hand SC', cursive", }}>
                            Favorites
                        </Typography>
                    </Box>
                    {recipeData.filter((recipe) => recipe.is_favorite) 
                            .map((recipe) => (
                                <Link
                                to={`/recipe/${encodeURIComponent(recipe.title)}`}
                                key={recipe.title}
                                style={{ textDecoration: "none", color: "inherit" }}
                                >
                                <div className="favorite-card" key={recipe.title}>
                                    <div style={{ flex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                        textAlign: "left",
                                        paddingBottom: "15px",
                                        fontSize: "15px",
                                        }}
                                    >
                                        {recipe.title}
                                    </Typography>
                                    </div>
                                </div>
                                </Link>
                            ))}
                </div>
                <div id="expiration-container">
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center",  padding: "10px 0", color:"#699FD0" }}>
                        <AccessTimeIcon /> 
                        <Typography variant="h5" sx={{ fontFamily: "'Patrick Hand SC', cursive", }}>
                            Expiration Coming Up
                        </Typography>
                    </Box>
                </div>


            </div>
        </Box>
    );
}