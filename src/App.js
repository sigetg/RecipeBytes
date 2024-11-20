import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/nav';
import RecipeList from './components/Recipe-list';
import GroceryList from './components/Grocery-list';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
            <Route path="/recipes" element={<RecipeList />} />
            <Route exact path="/groceries" element={<GroceryList />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
