import React, { useEffect, useState } from "react";
import Square from "./Sqaure";
import { useMainContext } from "../../context/MainContext"
import "./scoreboard.css"

interface BoardProps {
  result: { winner: string; state: string };
  setResult: React.Dispatch<
    React.SetStateAction<{ winner: string; state: string }>
  >;
}

const Patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board({ result, setResult }: BoardProps): JSX.Element {
  const {
    sendEvent,
    connection,
    uniqueId,
    sendRestart,
    opponentNick,
    nickname,
  } = useMainContext();
  const [winner, setWinner] = useState<string>("");
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setopponentScore] = useState<number>(0);
  const [board, setBoard] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [turn, setTurn] = useState<"X" | "O">("X");

  useEffect(() => {
    checkIfTie();
    checkWin();
  }, [board]);

  useEffect(() => {
    setPlayerScore(0);
    setopponentScore(0);
  }, [])

  const chooseSquare = async (square: number) => {
    if (turn === player && board[square] === "" && result.state === "none") {
      setTurn(player === "X" ? "O" : "X");
      sendEvent({ square, player });
      setBoard((prevBoard) =>
        prevBoard.map((val, idx) =>
          idx === square && val === "" ? player : val
        )
      );
    }
  };

  const restartGame = async () => {
    setBoard((prevBoard) => prevBoard.map((val, idx) => ""));
    setTurn("X");
    setPlayer(player === "X" ? "O" : "X");
    setWinner("");
    setResult({ winner: "none", state: "none" });
  };

  const checkWin = () => {
    Patterns.forEach((currPattern: any) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx: any) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        if (board[currPattern[0]] === "X") {
          setWinner("red");
        } else {
          setWinner("blue");
        }
        if (player === board[currPattern[0]]) setPlayerScore(playerScore + 1);
        else setopponentScore(opponentScore + 1);
        setResult({
          winner: player === board[currPattern[0]] ? nickname : opponentNick,
          state: "won",
        });
      }
    });
  };

  const checkIfTie = () => {
    const filled = board.every((square) => square !== "");

    if (filled) {
      setWinner("");
      setResult({ winner: "none", state: "tie" });
    }
  };

  connection?.on("GetMove", (user, data) => {
    if (user !== uniqueId) {
      const currentPlayer: "X" | "O" = data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard((prevBoard) =>
        prevBoard.map((val, idx) =>
          idx === data.square && val === "" ? data.player : val
        )
      );
    }
  });

  connection?.on("Restart", (user) => {
    restartGame();
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="scoreboard">
        <span className={`score ${player === "X" ? "x" : "o1" }-score ${player === turn ? "" : "inactive"} `}>{nickname} - {playerScore}</span>
        <span className={`score ${player === "X" ? "o" : "x1" }-score ${player !== turn ? "" : "inactive"}`}>
        {opponentNick} - {opponentScore}
        </span>
      </div>
      <div className="board" style={{ marginTop: "5vh" }}>
        <div className="row">
          <Square
            val={board[0]}
            winner={winner}
            chooseSquare={() => chooseSquare(0)}
          />
          <Square
            val={board[1]}
            winner={winner}
            chooseSquare={() => chooseSquare(1)}
          />
          <Square
            val={board[2]}
            winner={winner}
            chooseSquare={() => chooseSquare(2)}
          />
        </div>
        <div className="row">
          <Square
            val={board[3]}
            winner={winner}
            chooseSquare={() => chooseSquare(3)}
          />
          <Square
            val={board[4]}
            winner={winner}
            chooseSquare={() => chooseSquare(4)}
          />
          <Square
            val={board[5]}
            winner={winner}
            chooseSquare={() => chooseSquare(5)}
          />
        </div>
        <div className="row">
          <Square
            val={board[6]}
            winner={winner}
            chooseSquare={() => chooseSquare(6)}
          />
          <Square
            val={board[7]}
            winner={winner}
            chooseSquare={() => chooseSquare(7)}
          />
          <Square
            val={board[8]}
            winner={winner}
            chooseSquare={() => chooseSquare(8)}
          />
        </div>
      </div>
      {result.state !== "none" && (
        <button
          style={{ margin: "5px 0px" }}
          className="submit-button"
          onClick={sendRestart}
        >
          restart
        </button>
      )}
    </div>
  );
}

export default Board;
