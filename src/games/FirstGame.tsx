import React, { useEffect, useState } from "react";
import { Session, useMainContext } from "../context/MainContext";
import Board from "./Tic-Tac-Toe/Board";

const FirstGame: React.FC = () => {
  const { setJoinedToGameTic, opponentNick, closeConnection } =
    useMainContext();
  const [result, setResult] = useState<{ winner: string; state: string }>({
    winner: "none",
    state: "none",
  });

  const handleLeave = () => {
    closeConnection();
    setJoinedToGameTic(false);
  };

  useEffect(() => {
    if(!opponentNick){
      setResult({winner:"none", state:"none"})
    }
  }, [opponentNick])

  return (
    <div
      className="FirstGame"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {!opponentNick ? (
        <h1 style={{ color: "white" }}>
          {" "}
          Waiting for the other player to join...
        </h1>
      ) : (
        <>
          {result.state === "won" && <div style={{color:"white", marginTop:"3vh", alignSelf:"center"}}> {result.winner} Won The Game</div>}
          {result.state === "tie" && <div style={{color:"white", marginTop:"3vh", alignSelf:"center"}}> Game Tied</div>}
          <Board result={result} setResult={setResult} />
        </>
      )}
      <button className="submit-button" style={{marginTop:"5px"}} onClick={handleLeave}>
        Exit
      </button>
    </div>
  );
};

export default FirstGame;
