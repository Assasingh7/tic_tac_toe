import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.line || [];

  const handleSquareClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onSquareClick={() => handleSquareClick(i)}
      isWinningSquare={winningSquares.includes(i)}
    />
  );

  return (
    <div className="board-container">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row" >
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {//function
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default App;
