import React from 'react';
import './App.css';
import NavigationBar from './components/nav';
import RecipeList from './components/Recipe-list';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <RecipeList />
    </div>
  );
}

export default App;
