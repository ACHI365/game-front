import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import React, { createContext, useContext, useState } from "react";

interface MainContextProps {
  children: React.ReactNode;
}

export interface Session {
  id?: number;
  gameId?: number;
  roomId?: string;
  name?: string;
  occupancy: number;
  vacancy: boolean;
  playerConnectionIds: string[];
}

interface MainContextValue {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isNicknameEntered: boolean;
  setIsNicknameEntered: React.Dispatch<React.SetStateAction<boolean>>;
  joinedToGameTic: boolean;
  setJoinedToGameTic: React.Dispatch<React.SetStateAction<boolean>>;
  joinedToGame4G: boolean;
  setJoinedToGame4G: React.Dispatch<React.SetStateAction<boolean>>;
  currSession: Session | undefined;
  setCurrSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  opponentNick: string;
  setOpponentNick: React.Dispatch<React.SetStateAction<string>>;
  connection: HubConnection | undefined;
  setConnection: React.Dispatch<
    React.SetStateAction<HubConnection | undefined>
  >;
  sessionName: string;
  setSessionName: React.Dispatch<React.SetStateAction<string>>;
  handleCreation: (gameId: number) => void;
  handleSessionNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeConnection: () => void;
  sendMessage: () => void;
  sendRestart: () => void;
  sendEvent: (data: any) => void;
  joinRoom: (user: string, sessionName: string) => void;
  uniqueId: string;
  setUniqueId: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContext = createContext<MainContextValue | undefined>(
  undefined
);

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within MainProvider");
  }
  return context;
};

const MainProvider: React.FC<MainContextProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [isNicknameEntered, setIsNicknameEntered] = useState<boolean>(false);
  const [joinedToGameTic, setJoinedToGameTic] = useState<boolean>(false);
  const [joinedToGame4G, setJoinedToGame4G] = useState<boolean>(false);
  const [currSession, setCurrSession] = useState<Session | undefined>();
  const [opponentNick, setOpponentNick] = useState<string>("");
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const [users, setUsers] = useState([]);
  const [sessionName, setSessionName] = useState<string>("");
  const [uniqueId, setUniqueId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const createAndJoin = async (
    user: string,
    uniqueId: string,
    session: string,
    gameId: number
  ) => {
    try {
      setLoading(true);
      const connection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_BACK_URL}/gameHub`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        console.log(`${user} wrote a message for you: ${message}`);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
        if (users.length === 2) {
          setOpponentNick(
            users.filter((user: string[]) => user[1] !== uniqueId)[0][0]
          );
        } else {
          setOpponentNick("");
        }
        console.log(users);
      });

      connection.onclose((e) => {
        setConnection(undefined);
        setUsers([]);
      });

      await connection.start();
      let response = await connection.invoke("CreateAndJoin", {
        user,
        sessionName,
        gameId,
        uniqueId,
      });
      setLoading(false);
      if (response.statusCode === 200) {
        setConnection(connection);
        if (response.value.gameId === 1) {
          setJoinedToGameTic(true);
        } else {
          setJoinedToGame4G(true);
        }
        setSessions((prev) => [...prev, response.value]);
        setErrorMessage("")
      } else {        
        setErrorMessage(response.value)
        await connection.stop();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const joinRoom = async (user: string, sessionName: string) => {
    try {
      setLoading(true);
      const connection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_BACK_URL}/gameHub`)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        console.log(`${user} wrote a message for you: ${message}`);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
        if (users.length === 2) {
          setOpponentNick(
            users.filter((user: string[]) => user[1] !== uniqueId)[0][0]
          );
        } else {
          setOpponentNick("");
        }
        console.log(users);
      });

      connection.onclose((e) => {
        setConnection(undefined);
        setUsers([]);
      });

      await connection.start();
      let response = await connection.invoke("JoinSession", {
        user,
        sessionName,
        uniqueId,
      });
      console.log(response);
      setLoading(false);
      if (response.statusCode === 200) {
        setConnection(connection);
        if (response.value.gameId === 1) {
          setJoinedToGameTic(true);
        } else {
          setJoinedToGame4G(true);
        }
        setErrorMessage("")
      } else{
        setErrorMessage(response.value)
        await connection.stop();
      } 
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async () => {
    try {
      await connection?.invoke("SendMessage", nickname);
    } catch (e) {
      console.log(e);
    }
  };

  const sendRestart = async () => {
    try {
      await connection?.invoke("SendRestart");
    } catch (e) {
      console.log(e);
    }
  };

  const sendEvent = async (data: any) => {
    try {
      await connection?.invoke("SendMove", data);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      setOpponentNick("");
      await connection?.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionName(event.target.value);
  };

  const handleCreation = (gameId: number) => {
    createAndJoin(nickname, uniqueId, sessionName, gameId);
  };

  const contextValue = {
    sessions,
    setSessions,
    nickname,
    setNickname,
    isNicknameEntered,
    setIsNicknameEntered,
    joinedToGameTic,
    setJoinedToGameTic,
    joinedToGame4G,
    setJoinedToGame4G,
    currSession,
    setCurrSession,
    opponentNick,
    setOpponentNick,
    connection,
    setConnection,
    sessionName,
    setSessionName,
    handleCreation,
    handleSessionNameChange,
    closeConnection,
    sendMessage,
    joinRoom,
    uniqueId,
    setUniqueId,
    sendEvent,
    sendRestart,
    errorMessage,
    setErrorMessage
  };

  return (
    <MainContext.Provider value={contextValue}>
      {loading ? <>Loading...</> : children}
    </MainContext.Provider>
  );
};

export default MainProvider;
