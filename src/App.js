import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavigationBar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import GroceryList from "./components/GroceryList";
import Profile from "./components/Profile";
import PantryList from "./components/PantryList";
import RecipeDetailView from "./components/RecipeDetailView";
import CurrentWalkthrough from "./components/CurrentWalkthrough";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgetPassword";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthInitialized(true); // Mark auth as initialized
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthInitialized) {
    // Show a loading indicator until auth state is resolved
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
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
