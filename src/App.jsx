import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [square, setSquare] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [win, setWin] = useState("");

  const Square = ({ value, onClick }) => (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );

  function handleClick(currentIndex) {
    const cpySquare = [...square];
    if (getWinner(cpySquare) || cpySquare[currentIndex]) return;
    cpySquare[currentIndex] = xTurn ? "X" : "O";
    setXTurn(!xTurn);
    setSquare(cpySquare);
    getWinner(square);
  }

  function reset() {
    setSquare(Array(0).fill(""));
    setXTurn(true);
  }

  function getWinner(square) {
    const winning = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winning.length; i++) {
      const [x, y, z] = winning[i];
      if (square[x] && square[x] === square[y] && square[x] === square[z]) {
        console.log(square[x] + "is the winner");
        return square[x];
      }
    }
    return null;
  }

  useEffect(() => {
    if (!getWinner(square) && square.every((i) => i !== "")) {
      setWin("this is a draw! Please restart the game");
    } else if (getWinner(square)) {
      setWin(`The winner is ${getWinner(square)}`);
    } else {
      setWin(`The next player is ${xTurn ? "X" : "O"}`);
    }
  }, [square, xTurn]);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <h3>{win}</h3>
      <div className="row">
        <Square value={square[0]} onClick={() => handleClick(0)} />
        <Square value={square[1]} onClick={() => handleClick(1)} />
        <Square value={square[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={square[3]} onClick={() => handleClick(3)} />
        <Square value={square[4]} onClick={() => handleClick(4)} />
        <Square value={square[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={square[6]} onClick={() => handleClick(6)} />
        <Square value={square[7]} onClick={() => handleClick(7)} />
        <Square value={square[8]} onClick={() => handleClick(8)} />
      </div>
      <h2 className="info"></h2>
      {square[0] ||
      square[1] ||
      square[2] ||
      square[3] ||
      square[4] ||
      square[5] ||
      square[6] ||
      square[7] ||
      square[8] ? (
        <button className="play" onClick={reset}>
          Play
        </button>
      ) : null}
    </div>
  );
}

export default App;
