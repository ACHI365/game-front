import React, { useState } from "react";
import "./styles/MultiplayerWebsite.css";
import NicknameContainer from "./containers/NicknameContainer";
import GamesDisplayContainer from "./containers/GamesDisplayContainer";
import { useMainContext } from "../context/MainContext";
import FirstGame from "../games/FirstGame";
import SecondGame from "../games/SecondGame";
import generateUniqueId from "../services/generateUniqueId";

const MultiplayerWebsite: React.FC = () => {
  const {nickname, setNickname, isNicknameEntered, setIsNicknameEntered, joinedToGame4G, joinedToGameTic, setUniqueId} = useMainContext();
  const [] = useState<boolean>(true);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setUniqueId(generateUniqueId(event.target.value));
  };

  const handleNicknameSubmit = () => {
    if (nickname.trim() !== "") {    
      setIsNicknameEntered(true)
    }
  };

  return (
    <div className="container">
      {(!isNicknameEntered) ? (
       <NicknameContainer nickname={nickname} handleNicknameChange={handleNicknameChange}  handleNicknameSubmit={handleNicknameSubmit}/>
      ) : (
        joinedToGameTic? (
          <FirstGame/>
        ): joinedToGame4G? (
          <SecondGame/>
        ):
       <GamesDisplayContainer />
      )}
    </div>
  );
};

export default MultiplayerWebsite;
