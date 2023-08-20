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

// {!isNicknameEntered ? (
//   <MultiplayerWebsite />
// ) : (
//   connection ? (<>
//   <h1>HELLO</h1>
//   <button onClick={sendMessage}>Send Message</button>
//   <button onClick={closeConnection}>Leave</button>
//   </>) : (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition duration-300"
//       style={{ margin: 0 }}
//     >
//       <div
//         className="bg-opacity-80 p-6 rounded-lg w-1/3"
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.1)",
//           minWidth: "300px",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Enter session name"
//           value={sessionName}
//           onChange={handleSessionNameChange}
//           className="w-full py-2 px-4 mb-4 border rounded-lg bg-transparent border-white text-white"
//         />
//         <button
//           type="submit"
//           className="w-full submit-button text-white font-bold py-2 px-4 rounded-lg"
//           onClick={handleSubmit}
//         >
//           Create Session
//         </button>

//         <button
//           type="submit"
//           className="w-full submit-button text-white font-bold py-2 px-4 rounded-lg"
//           onClick={() => joinRoom(nickname)}
//         >
//           Join Session
//         </button>
//       </div>
//     </div>
//   )
// )}

  // const createAndJoin = async (user: string, session: string) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl(`${process.env.REACT_APP_BACK_URL}/gameHub`)
  //       .configureLogging(LogLevel.Information)
  //       .build();

  //     connection.on("ReceiveMessage", (user, message) => {
  //       console.log(`${user} wrote a message for you: ${message}`);
  //     });

  //     connection.on("UsersInRoom", (users) => {
  //       setUsers(users);
  //       console.log(users)
  //     });

  //     connection.onclose((e) => {
  //       setConnection(undefined);
  //       setMessages([]);
  //       setUsers([]);
  //     });

  //     await connection.start();
  //     console.log(user)
  //     console.log(session)
  //     await connection.invoke("CreateAndJoin", { user, sessionName });
  //     setConnection(connection);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const joinRoom = async (user:string) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl(`${process.env.REACT_APP_BACK_URL}/gameHub`)
  //       .build();

  //     connection.on("ReceiveMessage", (user, message) => {
  //       console.log(`${user} wrote a message for you: ${message}`);
  //     });

  //     connection.on("UsersInRoom", (users) => {
  //       setUsers(users);
  //       console.log(users)
  //     });

  //     connection.onclose((e) => {
  //       setConnection(undefined);
  //       setMessages([]);
  //       setUsers([]);
  //     });
    
  //     await connection.start();
  //     await connection.invoke("JoinSession", { user, sessionName });
  //     setConnection(connection);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const sendMessage = async () => {
  //   try {
  //     await connection?.invoke("SendMessage", currUser);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const closeConnection = async () => {
  //   try {
  //     await connection?.stop();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleSessionNameChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setSessionName(event.target.value);
  // };

  // const handleSubmit = () => {
  //   createAndJoin(currUser, sessionName);
  // };
