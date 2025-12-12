
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { TOTAL_LEVELS } from "../constants";

interface GameContextType {
  currentMap: number;
  setCurrentMap: React.Dispatch<React.SetStateAction<number>>;
  completedLevels: number;
  bestTimes: { [key: number]: number };
  updateBestTime: (mapId: number, time: number) => void;
  resetGameProgress: () => void;
  completeLevel: (mapId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const getStoredNumber = (key: string, defaultValue: number): number => {
    try {
        const item = localStorage.getItem(key);
        return item ? parseInt(item, 10) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return defaultValue;
    }
};

const getStoredObject = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return defaultValue;
    }
};


export function GameProvider({ children }: { children: ReactNode }) {
  const [currentMap, setCurrentMap] = useState(1);
  const [completedLevels, setCompletedLevels] = useState(() => getStoredNumber("completedLevels", 0));
  const [bestTimes, setBestTimes] = useState<{ [key: number]: number }>(() => getStoredObject("bestTimes", {}));

  useEffect(() => {
    try {
        localStorage.setItem("completedLevels", completedLevels.toString());
    } catch (error) {
        console.error("Error saving completedLevels to localStorage", error);
    }
  }, [completedLevels]);

  useEffect(() => {
    try {
      localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
    } catch (error) {
      console.error("Error saving bestTimes to localStorage", error);
    }
  }, [bestTimes]);

  const updateBestTime = useCallback((mapId: number, time: number) => {
    setBestTimes(prev => {
        const currentBest = prev[mapId];
        if (!currentBest || time < currentBest) {
            return { ...prev, [mapId]: time };
        }
        return prev;
    });
  }, []);

  const completeLevel = useCallback((mapId: number) => {
      setCompletedLevels(prev => Math.max(prev, mapId));
  }, []);

  const resetGameProgress = useCallback(() => {
    setCurrentMap(1);
  }, []);

  return (
    <GameContext.Provider
      value={{
        currentMap,
        setCurrentMap,
        completedLevels,
        bestTimes,
        updateBestTime,
        resetGameProgress,
        completeLevel
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
