<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <header>Tic Tac Toe Game</header>
    <App />
  </>
);
=======
import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./components/game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
>>>>>>> 903c9ac5263baeefba85e10d82a031c6e723c72c
