import React, { useState, useRef, useEffect } from "react";
import { useMainContext } from "../../context/MainContext";

type SessionType = "Tic" | "4G";

interface CreateSessionPopupProps {
  onClose: () => void;
  sessionType: SessionType;
}

const CreateSessionPopup: React.FC<CreateSessionPopupProps> = ({
  onClose,
  sessionType,
}) => {
  const {opponentNick, setJoinedToGameTic, setJoinedToGame4G, sessionName, setSessionName, handleCreation, errorMessage, setErrorMessage} = useMainContext();
  // const {handleCreateSession} = useGameSessionContext();
  // const [sessionName, setSessionName] = useState<string>("");
 
  const popupRef = useRef<HTMLDivElement>(null);


  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSessionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionName(event.target.value);
  };


  const handleSubmit = () => {
    if (sessionName.trim() === "") {
      setErrorMessage("Please enter a session name.");
    } else {
      setErrorMessage("");
      handleCreation(sessionType==="Tic" ? 1 : 2);
      onClose();
    }
  };


  const handleDocumentClick = (event: MouseEvent) => {
    if (!popupRef.current?.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition duration-300"
      style={{ margin: 0 }}
    >
      <div
        ref={popupRef}
        className="bg-opacity-80 p-6 rounded-lg w-1/3"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          minWidth: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Enter session name"
          value={sessionName}
          onChange={handleSessionNameChange}
          className="w-full py-2 px-4 mb-4 border rounded-lg bg-transparent border-white text-white"
          onKeyDown={handleEnterKeyPress}
        />
        <button
          type="submit"
          className="w-full submit-button text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Create Session
        </button>
      </div>
    </div>
  );
};

export default CreateSessionPopup;
