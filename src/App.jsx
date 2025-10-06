/*parent component*/
import React, { useState } from "react";
import TicTacToe from "./TicTacToe";

export default function App() {
  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Determine winner (helper function)
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Handle user click
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // Restart game
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Winner: ${winner === "X" ? "❌" : "🟢"}`
    : `Next player: ${xIsNext ? "❌" : "🟢"}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-sky-200 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-6">
        🌈 Tic Tac Toe 🌟
      </h1>

      <TicTacToe squares={squares} handleClick={handleClick} />

      <div className="mt-6 text-2xl font-semibold">{status}</div>

      <button
        onClick={restartGame}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        🔄 Restart Game
      </button>
    </div>
  );
}
