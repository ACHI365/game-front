import React, { useState } from "react";
import "../styles/Nickname.css";

interface NickProps {
  nickname: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNicknameSubmit: () => void;
}

const NicknameContainer: React.FC<NickProps> = ({
  nickname,
  handleNicknameChange,
  handleNicknameSubmit,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNicknameSubmit();
    }
  };

  const handleSubmit = () => {
    if (nickname.trim() === "") {
      setErrorMessage("Please enter a nickname.");
    } else {
      setErrorMessage("");
      handleNicknameSubmit();
    }
  };

  return (
    <div className="nickname-container">
      <input
        className="nickname-input"
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={handleNicknameChange}
        onKeyDown={handleEnterKeyPress}
      />
      <button
        className="submit-button bg-blue hover:bg-blue-light text-white font-bold border-b-4 border-blue-dark hover:border-blue rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {errorMessage && <p className="error-message text-red-600 mr-24">{errorMessage}</p>}
    </div>
  );
};

export default NicknameContainer;
