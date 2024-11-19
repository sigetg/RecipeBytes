import React from 'react';
import './App.css';
import NavigationBar from './components/nav';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
