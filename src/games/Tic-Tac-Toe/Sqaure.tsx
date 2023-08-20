import React from "react";

interface SquareProps {
  chooseSquare: () => void;
  val: string;
  winner: string
}

function Square({ chooseSquare, val, winner }: SquareProps): JSX.Element {
  return (
    <div className="square" style={{color: val==="X" ? "red" : "blue", borderColor:winner}} onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;
