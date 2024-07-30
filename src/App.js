import React from 'react';
import './App.css';
import Income from './components/Income';
import Deposits from './components/Deposits';
import MainRevenue from './components/MainRevenue';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hedera Revenue Dashboard</h1>
      </header>
      <main className="dashboard">
        <Income />
        <MainRevenue />
        <Deposits />
      </main>
      <footer>
        <p>Built by Hgraph</p>
      </footer>
    </div>
  );
}

export default App;
