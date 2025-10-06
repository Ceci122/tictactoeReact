/*child <component>*/
import React from "react";

export default function TicTacToe({ squares, handleClick }) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white/30 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40">
      {squares.map((value, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-24 h-24 text-5xl font-bold rounded-2xl transition-all duration-200 
            shadow-md border-2 border-white/50
            hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]
            active:scale-95
            ${
              value === "X"
                ? "bg-gradient-to-br from-pink-500 to-red-400 text-white shadow-pink-400/50"
                : value === "O"
                ? "bg-gradient-to-br from-sky-400 to-emerald-400 text-white shadow-sky-400/50"
                : "bg-white/70 text-transparent hover:text-gray-300"
            }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
