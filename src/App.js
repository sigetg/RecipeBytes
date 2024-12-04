import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import GroceryList from "./components/GroceryList";
import Profile from "./components/Profile";
import PantryList from "./components/PantryList";
import RecipeDetailView from "./components/RecipeDetailView";
import CurrentWalkthrough from "./components/CurrentWalkthrough";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <PrivateRoute>
                <RecipeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/groceryList"
            element={
              <PrivateRoute>
                <GroceryList />
              </PrivateRoute>
            }
          />
          <Route
            path="/pantry"
            element={
              <PrivateRoute>
                <PantryList />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <PrivateRoute>
                <RecipeDetailView />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipe/:id/:stepIndex"
            element={
              <PrivateRoute>
                <CurrentWalkthrough />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
