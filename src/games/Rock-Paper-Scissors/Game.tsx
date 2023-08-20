import React, { useState, useEffect } from "react";
import "./Game.css";

import {
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
  FaHandLizard,
  FaHandSpock,
} from "react-icons/fa";
import { useMainContext } from "../../context/MainContext";

const actions: Record<string, string[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
};

function randomAction(): string {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function calculateWinner(action1: string, action2: string): number | null {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }
  return null;
}

interface ActionIconProps {
  action: string;
  size: number;
}

function ActionIcon({ action, ...props }: ActionIconProps): JSX.Element {
  const icons: Record<string, React.ElementType> = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
    lizard: FaHandLizard,
    spock: FaHandSpock,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

interface PlayerProps {
  name?: string;
  score?: number;
  action?: string;
}

function Player({
  name = "Player",
  score = 0,
  action = "rock",
}: PlayerProps): JSX.Element {
  return (
    <div className="player">
      <div
        className="scores"
        style={{ backgroundColor: "#0d47a1" }}
      >{`${name}: ${score}`}</div>
      <div className="action" style={{ display: "flex" }}>
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

interface ActionButtonProps {
  action: string;
  onActionSelected: (selectedAction: string) => void;
}

function ActionButton({
  action = "rock",
  onActionSelected,
}: ActionButtonProps): JSX.Element {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}

interface ShowWinnerProps {
  winner: number | null;
}

function ShowWinner({ winner = 0 }: ShowWinnerProps): JSX.Element {
  const text: Record<string, string> = {
    "-1": "You Win!",
    "0": "It's a Tie",
    "1": "You Lose!",
  };

  if (winner !== null) return <h2>{text[winner.toString()]}</h2>;
  else return <></>;
}

function Game(): JSX.Element {
  const [playerAction, setPlayerAction] = useState<string>("");
  const [computerAction, setComputerAction] = useState<string>("");
  const { opponentNick, connection, uniqueId, sendEvent, nickname } =
    useMainContext();
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [winner, setWinner] = useState<number | null>(0);
  const [previousActions, setPreviousActions] = useState<string[]>([]);

  useEffect(() => {
    if (playerAction && computerAction) {
      const newWinner = calculateWinner(playerAction, computerAction);
      setWinner(newWinner);
      if (newWinner === -1) {
        setPlayerScore(playerScore + 1);
      } else if (newWinner === 1) {
        setComputerScore(computerScore + 1);
      }
      if (playerAction && computerAction)
        setPreviousActions([playerAction, computerAction]);
      setPlayerAction("");
      setComputerAction("");
    }
  }, [playerAction, computerAction]);

  const onActionSelected = (selectedAction: string): void => {
    if (!playerAction) {
      setPlayerAction(selectedAction);
      sendEvent({ square: 0, player: selectedAction });
    }
  };

  connection?.on("GetMove", (user, data) => {
    if (user !== uniqueId) {
      setComputerAction(data.player);
      setPreviousActions(["", ""]);
    }
  });

  return (
    <div className="center" style={{ margin: "0vh auto" }}>
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className="container">
          <Player
            name={nickname}
            score={playerScore}
            action={playerAction ? playerAction : previousActions[0]}
          />
          <Player
            name={opponentNick}
            score={computerScore}
            action={
              playerAction
                ? computerAction ?? previousActions[1]
                : previousActions[1]
            }
          />
        </div>
        <div>
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />
          <ActionButton action="lizard" onActionSelected={onActionSelected} />
          <ActionButton action="spock" onActionSelected={onActionSelected} />
        </div>
        <ShowWinner winner={winner} />
      </div>
      <img
        className="w-full h-auto photo"
        src={"/images/rules-removebg-preview.png"}
        alt={"alt"}
      />
    </div>
  );
}

export default Game;
