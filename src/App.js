import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import GroceryList from "./components/GroceryList";
import Profile from "./components/Profile";
import PantryList from "./components/PantryList";
import RecipeDetailView from "./components/RecipeDetailView";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
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
          path="/recipe/:title"
          element={
            <PrivateRoute>
              <RecipeDetailView />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
