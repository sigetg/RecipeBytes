import React from 'react';
import './App.css';
import NavigationBar from './components/nav';
import RecipeList from './components/Recipe-list';
import GroceryList from './components/Grocery-list';

function App() {
  return (
    <div className="App">
      <NavigationBar />
    </div>
  );
}

export default App;
