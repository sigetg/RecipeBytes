import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import GroceryList from "./components/GroceryList";
import Profile from "./components/Profile";
import PantryList from "./components/PantryList";
import RecipeDetailView from "./components/RecipeDetailView";
import CurrentWalkthrough from "./components/CurrentWalkthrough";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/groceryList" element={<GroceryList />} />
          <Route path="/pantry" element={<PantryList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<RecipeDetailView />} />
          <Route path="/recipe/:title/:stepIndex" element={<CurrentWalkthrough />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
