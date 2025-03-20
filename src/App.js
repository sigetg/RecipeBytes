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
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
=======
          <Route path="/RecipeBytes/login" element={<Login />}/>
          <Route path="/RecipeBytes/signup" element={<SignUp />} />
          <Route path="/RecipeBytes/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/RecipeBytes"
            element={              
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/RecipeBytes/home"
>>>>>>> linda-origin/main
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
=======
            path="/RecipeBytes/recipes"
>>>>>>> linda-origin/main
            element={
              <PrivateRoute>
                <RecipeList />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/groceryList"
=======
            path="/RecipeBytes/groceryList"
>>>>>>> linda-origin/main
            element={
              <PrivateRoute>
                <GroceryList />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/pantry"
=======
            path="/RecipeBytes/pantry"
>>>>>>> linda-origin/main
            element={
              <PrivateRoute>
                <PantryList />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/profile"
=======
            path="/RecipeBytes/profile"
>>>>>>> linda-origin/main
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/recipe/:id"
=======
            path="/RecipeBytes/recipe/:id"
>>>>>>> linda-origin/main
            element={
              <PrivateRoute>
                <RecipeDetailView />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/recipe/:id/:stepIndex"
=======
            path="/RecipeBytes/recipe/:id/:stepIndex"
>>>>>>> linda-origin/main
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
