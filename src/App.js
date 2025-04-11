import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
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
import "./styles/App.css";
import { NAVBAR, RECIPE_ROUTES } from "./routes/routes";

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
    <Router basename = {NAVBAR.BASE}>
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path={NAVBAR.LOGIN} element={<Login />}/>
          <Route path={NAVBAR.SIGNUP} element={<SignUp />} />
          <Route path={NAVBAR.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path= {NAVBAR.EMPTY}
            element={              
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path={NAVBAR.HOME}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path={NAVBAR.RECIPES}
            element={
              <PrivateRoute>
                <RecipeList />
              </PrivateRoute>
            }
          />
          <Route
            path={NAVBAR.GROCERY}
            element={
              <PrivateRoute>
                <GroceryList />
              </PrivateRoute>
            }
          />
          <Route
            path={NAVBAR.PANTRY}
            element={
              <PrivateRoute>
                <PantryList />
              </PrivateRoute>
            }
          />
          <Route
            path={NAVBAR.PROFILE}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path={RECIPE_ROUTES.RECIPE}
            element={
              <PrivateRoute>
                <RecipeDetailView />
              </PrivateRoute>
            }
          />
          <Route
            path={RECIPE_ROUTES.RECIPE_STEP}
            element={
              <PrivateRoute>
                <CurrentWalkthrough />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={NAVBAR.LOGIN} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
