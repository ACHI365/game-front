import React, { useState } from "react";
import "../styles/GamesDisplay.css";
import GameButton from "./GameButton";
import CreateSessionPopup from "./CreateSessionPopup";
import JoinSessionPopup from "./JoinSession";
import { useMainContext } from "../../context/MainContext";

const GamesDisplayContainer: React.FC = () => {
  const [isCreateSessionTicOpen, setCreateSessionTicOpen] =
    useState<boolean>(false);
  const [isCreateSession4GOpen, setCreateSession4GOpen] =
    useState<boolean>(false);
  const [showTicJoinPopup, setTicShowJoinPopup] = useState(false);
  const [show4GJoinPopup, set4GShowJoinPopup] = useState(false);
  const { sessions, nickname, errorMessage } = useMainContext();

  const openTicJoinPopup = () => {
    setTicShowJoinPopup(true);
  };

  const open4GJoinPopup = () => {
    set4GShowJoinPopup(true);
  };

  const handleCreateSessionTickClick = () => {
    setCreateSessionTicOpen(true);
  };
  const handleCreateSession4GClick = () => {
    setCreateSession4GOpen(true);
  };

  const handleClosePopup = () => {
    setCreateSessionTicOpen(false);
    setCreateSession4GOpen(false);
    set4GShowJoinPopup(false);
    setTicShowJoinPopup(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-white text-2xl mt-8">
        Hello {nickname}! <br/> Choose your game
      </h1>
      {errorMessage && (
          <p className="error-message text-red-600">{errorMessage}</p>
        )}
      <div className="big-container">
        <GameButton
          image="/images/tic-tac-toe.png"
          alt="tic-tac-toe"
          onClick={handleCreateSessionTickClick}
          sessionCreate={openTicJoinPopup}
          name="Tic-Tac-Toe"
        />
        <GameButton
          image="/images/try.png"
          alt="4-games?"
          onClick={handleCreateSession4GClick}
          sessionCreate={open4GJoinPopup}
          name="Rock-Paper-Scissors"
        />
        {isCreateSessionTicOpen && (
          <CreateSessionPopup sessionType="Tic" onClose={handleClosePopup} />
        )}
        {isCreateSession4GOpen && (
          <CreateSessionPopup sessionType="4G" onClose={handleClosePopup} />
        )}
        {showTicJoinPopup && (
          <JoinSessionPopup sessions={sessions} gameId={1} onClose={handleClosePopup} />
        )}
        {show4GJoinPopup && (
          <JoinSessionPopup sessions={sessions} gameId={2} onClose={handleClosePopup} />
        )}
      </div>
    </div>
  );
};

export default GamesDisplayContainer;
