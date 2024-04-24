import React from "react";
import logo from "./logo.svg";
import Game from "./game/Game.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main>
        <Game />
        <div className="Footer">Made with love by quantum-corn!</div>
      </main>
    </div>
  );
}

export default App;
