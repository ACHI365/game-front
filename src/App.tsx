import React, { useEffect, useState } from "react";
import MultiplayerWebsite from "./components/MultiplayerWebsite";
import "./components/styles/App.css";
import MainProvider, { useMainContext } from "./context/MainContext";
import { HubConnection, HubConnectionBuilder, LogLevel  } from "@microsoft/signalr";
import { create } from "domain";

const App: React.FC = () => {
  const {nickname, isNicknameEntered, connection, sendMessage, closeConnection, joinRoom, sessionName, handleSessionNameChange, handleCreation} = useMainContext();
  
  return (
    <div className="App">
      <MultiplayerWebsite />
    </div>
  );
};

export default App;