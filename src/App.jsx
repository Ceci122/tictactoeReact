/*parent component*/
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hooks-library/core";
import TicTacToe from "./TicTacToe";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [starterChosen, setStarterChosen] = useState(false); // new state
  const [score, setScore] = useState({ X: 0, O: 0 });


  // calculate winner
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
    setStarterChosen(false); // go back to choose screen
  };

  const winner = calculateWinner(squares);

  // Update score if there's a winner
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
      setScore(prevScore => ({...prevScore,[winner]: prevScore[winner] + 1}));
    }, 200); // slight delay to allow confetti to show
  }
}, [winner]);

  const status = winner
    ? `🎉 Winner: ${winner === "X" ? "❌" : "🟢"}`
    : `Next player: ${xIsNext ? "❌" : "🟢"}`;

  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-sky-200 text-gray-800">
      {/* confetti only when there's a winner */}
      {winner && ( <Confetti 
      width={window.innerWidth} 
      height={window.innerHeight} 
      recycle={false} 
      numberOfPieces={100} 
      />
      )}

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6 animate float">
        🌈 Tic Tac Toe 🌟
      </h1>

      {/* ===== Choose Starter Screen ===== */}
      {!starterChosen ? (
        <div className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold mb-4">
            Who should start the game?
          </h2>
          <div className="flex gap-6">
            <button
              onClick={() => {
                setXIsNext(true);
                setStarterChosen(true);
              }}
              className="btn bg-gradient-to-br from-pink-500 to-red-400 text-white text-xl shadow-lg hover:scale-105 transition-transform"
            >
              ❌ X Starts
            </button>
            <button
              onClick={() => {
                setXIsNext(false);
                setStarterChosen(true);
              }}
              className="btn bg-gradient-to-br from-sky-400 to-emerald-400 text-white text-xl shadow-lg hover:scale-105 transition-transform"
            >
              🟢 O Starts
            </button>
          </div>
        </div>
      ) : (
        <>

      {/* Game board */}
      <TicTacToe squares={squares} handleClick={handleClick} />

      {/* top bar */}
      <div className="flex justify-between items-center w-full max-w-lg mb-8 bg-white/40 backdrop-blur-lg p-4 rounded-2xl shadow-md border border-white/30">
        {/* Scoreboard */}
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-pink-200 rounded-lg shadow-sm">
            <h3 className="text-pink-700 font-semibold">X</h3>
            <p className="text-lg font-bold">{score.X}</p>
        </div>

        <div className="px-4 py-2 bg-sky-200 rounded-lg shadow-sm">
          <h3 className="text-sky-700 font-semibold">O</h3>
          <p className="text-lg font-bold">{score.O}</p>
        </div>
        </div>

      {/* Status Message */}
      <div className="mt-6 text-xl font-semibold text-gray-700">{status}</div>

      {/* Restart and Reset Buttons */}
      <div className="flex gap-2">
      <button
        onClick={restartGame}
        className="btn btn-sm bg-pink-400 text-white shadow-md hover:scale-105 transition-transform"
      >
        🔄 Restart Game
      </button>

      <button
        onClick={() => setScore({ X: 0, O: 0 })}
        className="btn btn-sm bg-pink-400 text-white shadow-md hover:scale-105 transition-transform"
      >
        🧹 Reset Score
      </button>
      </div>
      </div>
      </>
      )}
    </div>
  );
}
