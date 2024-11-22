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
          path="/recipes"
          element={
            <PrivateRoute>
              <RecipeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/grocery-list"
          element={
            <PrivateRoute>
              <GroceryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Profile />
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
          path="/recipe/:title"
          element={
            <PrivateRoute>
              <RecipeDetailView />
            </PrivateRoute>
          }
        />
      </Routes>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/groceryList" element={<GroceryList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pantry" element={<PantryList />} />
          <Route path="/recipe/:title" element={<RecipeDetailView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
