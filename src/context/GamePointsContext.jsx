import React, { createContext, useState, useContext, useEffect } from 'react';

export const GamePointsContext = createContext();

export function GamePointsProvider({ children }) {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('recycleGamePoints');
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem('recycleGamePoints', newPoints.toString());
  };

  return (
    <GamePointsContext.Provider value={{ points, addPoints }}>
      {children}
    </GamePointsContext.Provider>
  );
}

export function useGamePoints() {
  return useContext(GamePointsContext);
}