import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Hannahgrams } from './features/hannahgrams/Hannahgrams';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hannahgrams />
      </header>
    </div>
  );
}

export default App;
