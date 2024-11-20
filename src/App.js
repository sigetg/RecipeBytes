import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import GroceryList from "./components/Grocery-list";
import Profile from "./components/Profile";
import Pantry from "./components/PantryList";
import RecipeDetailView from "./components/RecipeDetailView";
import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/" element={<Profile />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/recipe/:title" element={<RecipeDetailView />} />
      </Routes>
    </Router>
  );
}

export default App;
