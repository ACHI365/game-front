import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

interface GameButtonProps {
  image: string;
  alt: string;
  onClick: any;
  sessionCreate: any;
  name: string
}

const GameButton: React.FC<GameButtonProps> = ({
  image,
  alt,
  onClick,
  sessionCreate,
  name
}) => {
  const [showButtons, setShowButtons] = useState(false);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleClick = () => {
    if (showButtons) {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  };

  return (
    <div
      className="photo-container flex-1 bg-opacity-10 bg-white bg-blur border border-white border-opacity-30 rounded-lg p-2 transition-transform transform hover:scale-95"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="text-white text-xl mb-2">
        <span>{name}</span>
      </div>
      <img className="w-full h-auto photo" src={image} alt={alt} />

      {showButtons && (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <button
            className="border-2 border-white border-opacity-40 bg-opacity-5 hover:bg-opacity-10 hover:border-opacity-60 text-white font-bold py-2 px-8 rounded-lg mb-2 w-2/3"
            onClick={onClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create a session
          </button>
          <button
            className="border-2 border-white border-opacity-40 bg-opacity-5 hover:bg-opacity-10 hover:border-opacity-60 text-white font-bold py-2 px-8 rounded-lg mb-2 w-2/3"
            onClick={sessionCreate}
          >
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Join the session
          </button>
        </div>
      )}
    </div>
  );
};

export default GameButton;
