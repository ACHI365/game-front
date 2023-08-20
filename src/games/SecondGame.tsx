import React from "react";
import { Session, useMainContext } from "../context/MainContext";
import Game from "./Rock-Paper-Scissors/Game";

const SecondGame: React.FC = () => {
  const { setJoinedToGame4G, opponentNick, closeConnection } = useMainContext();

  const handleLeave = () => {
    closeConnection();
    setJoinedToGame4G(false);
  };

  return (
    <div
      className="SecondGame"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {!opponentNick ? (
        <h1 style={{ color: "white" }}>
          Waiting for the other player to join...
        </h1>
      ) : (
        <Game />
      )}
      <button className="submit-button" onClick={handleLeave}>
        Exit
      </button>
    </div>
  );
};

export default SecondGame;
