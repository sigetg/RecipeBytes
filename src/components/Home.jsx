import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "../styles/Home.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RingVolume } from "@mui/icons-material";

export default function Home() {
    return (
        <Box sx={{ padding: "30px" }}>
            <div className="title-container">
                <AccountCircleIcon sx={{ height: "40px", width: "40px"}} />
                <Typography variant="h4" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive" }} >
                    Welcome Username
                </Typography>
            </div>
            <div className="container-content">
                <div id="recipe-suggestion-container">
                    <Typography variant="h6" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive" }} >
                        Recipes You Might Like
                    </Typography>
                </div>
                <div id="favorites-container">
                    <Typography variant="h6" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive" }} >
                        Favorites
                    </Typography>

                </div>
                <div id="expiration-container">
                    <Typography variant="h6" sx={{ wordSpacing:"3px", letterSpacing:"3px", fontFamily: "'Patrick Hand SC', cursive" }} >
                        Expiration Coming Up
                    </Typography>
                </div>
            </div>
        </Box>
    );
}