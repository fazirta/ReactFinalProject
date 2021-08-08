import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameProvider = props => {
  const [game, setGame] = useState([]);

  return (
    <GameContext.Provider value={[game, setGame]}>
      {props.children}
    </GameContext.Provider>
  );
};