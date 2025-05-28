import React, { useState } from "react";
import Cell from "./cell.js";
import "./game.css";

function Game() {
    const [board, setBoard] = useState([
        ["+", "+", "+"],
        ["+", "+", "+"],
        ["+", "+", "+"],
    ]);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    function checkWinner(board, rowIdx, colIdx) {
        const currentSymbol = board[rowIdx][colIdx];

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === currentSymbol &&
                board[i][1] === currentSymbol &&
                board[i][2] === currentSymbol
            ) {
                setWinner(currentSymbol);
                return;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i] === currentSymbol &&
                board[1][i] === currentSymbol &&
                board[2][i] === currentSymbol
            ) {
                setWinner(currentSymbol);
                return;
            }
        }

        // Check diagonals
        if (
            (rowIdx === colIdx &&
                board[0][0] === currentSymbol &&
                board[1][1] === currentSymbol &&
                board[2][2] === currentSymbol) ||
            (rowIdx + colIdx === 2 &&
                board[0][2] === currentSymbol &&
                board[1][1] === currentSymbol &&
                board[2][0] === currentSymbol)
        ) {
            setWinner(currentSymbol);
            return;
        }

        // Check for draw
        let draw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "+") {
                    draw = false;
                    break;
                }
            }
        }

        if (draw) setWinner("Draw");
    }

    function changeCellValue(rowIdx, colIdx) {
        if (winner || board[rowIdx][colIdx] !== "+") return;

        const newBoard = board.map((row) => [...row]);
        newBoard[rowIdx][colIdx] = xIsNext ? "X" : "O";

        setBoard(newBoard);
        setXIsNext(!xIsNext);
        checkWinner(newBoard, rowIdx, colIdx);
    }

    return (
        <div className="gameWrapper">
            <h1>Tic Tac Toe</h1>
            {winner && <h2>Winner: {winner}</h2>}
            {board.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className="rowWrapper">
                        {row.map((col, colIdx) => {
                            return (
                                <Cell
                                    onClick={changeCellValue.bind(
                                        null,
                                        rowIdx,
                                        colIdx
                                    )}
                                    key={colIdx}
                                    value={col}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Game;