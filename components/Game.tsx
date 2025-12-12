import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGameContext } from '../hooks/useGameContext';
import { getMap, CAT_SIZE, CAT_SPEED, GAME_WIDTH, GAME_HEIGHT, TOTAL_LEVELS } from '../constants';
import { Position, Lamp } from '../types';
import Joystick from './Joystick';
import Modal from './Modal';

interface GameProps {
  onExit: () => void;
}

const Game: React.FC<GameProps> = ({ onExit }) => {
  const { currentMap, updateBestTime, completeLevel, setCurrentMap } = useGameContext();
  
  const [mapConfig, setMapConfig] = useState(() => getMap(currentMap));
  const [catPos, setCatPos] = useState<Position>(mapConfig.startPosition);
  const [lamps, setLamps] = useState<Lamp[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameOver' | 'levelComplete' | 'gameWon'>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isInShadow, setIsInShadow] = useState(true);

  // FIX: Initialized `gameLoopRef` with `null`. The `useRef` hook was called with a generic type but no initial value, which can cause type errors in some environments. This makes it consistent with other refs in the component.
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const joystickDataRef = useRef({ angle: 0, distance: 0 });

  const initializeLevel = useCallback(() => {
    const newMapConfig = getMap(currentMap);
    setMapConfig(newMapConfig);
    setCatPos(newMapConfig.startPosition);
    setLamps(newMapConfig.lamps.map((lamp, index) => ({
        ...lamp,
        id: index,
        x: lamp.baseX,
        y: lamp.baseY,
        moveAngle: Math.random() * Math.PI * 2,
    })));
    setGameState('idle');
    setElapsedTime(0);
    setIsInShadow(true);
    lastTimeRef.current = 0;
    startTimeRef.current = 0;
    joystickDataRef.current = { angle: 0, distance: 0 };
  }, [currentMap]);

  useEffect(() => {
    initializeLevel();
  }, [currentMap, initializeLevel]);

  const checkInLight = useCallback((pos: Position, currentLamps: Lamp[]) => {
    for (const lamp of currentLamps) {
      const dx = pos.x - lamp.x;
      const dy = pos.y - lamp.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < lamp.radius) {
        return true;
      }
    }
    return false;
  }, []);

  const gameLoop = useCallback((timestamp: number) => {
    if (gameLoopRef.current) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    if (gameState !== 'playing') {
        lastTimeRef.current = timestamp;
        return;
    }
    
    if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
        return;
    }
    
    // Update Lamps
    const updatedLamps = lamps.map(lamp => {
        const newAngle = lamp.moveAngle + lamp.moveSpeed;
        let newX, newY;

        if (lamp.movementType === 'horizontal') {
            newX = lamp.baseX + Math.cos(newAngle) * lamp.moveRadius;
            newY = lamp.baseY;
        } else if (lamp.movementType === 'vertical') {
            newX = lamp.baseX;
            newY = lamp.baseY + Math.sin(newAngle) * lamp.moveRadius;
        } else { // Default circular movement
            newX = lamp.baseX + Math.cos(newAngle) * lamp.moveRadius;
            newY = lamp.baseY + Math.sin(newAngle) * lamp.moveRadius;
        }
        
        return {
            ...lamp,
            moveAngle: newAngle,
            x: newX,
            y: newY,
        };
    });

    // Calculate next Cat Position from Joystick
    const { angle, distance } = joystickDataRef.current;
    let nextCatPos = catPos;
    if (distance > 0) {
        const newX = catPos.x + Math.cos(angle) * distance * CAT_SPEED;
        const newY = catPos.y + Math.sin(angle) * distance * CAT_SPEED;
        const clampedX = Math.max(CAT_SIZE / 2, Math.min(GAME_WIDTH - CAT_SIZE / 2, newX));
        const clampedY = Math.max(0, Math.min(GAME_HEIGHT - CAT_SIZE / 2, newY));
        nextCatPos = { x: clampedX, y: clampedY };
    }

    // Check conditions
    const inLight = checkInLight(nextCatPos, updatedLamps);

    // Update all states together
    setLamps(updatedLamps);
    setCatPos(nextCatPos);
    setIsInShadow(!inLight);

    if (inLight) {
        setGameState('gameOver');
    } else if (nextCatPos.y <= 0) {
        const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateBestTime(currentMap, finalTime);
        completeLevel(currentMap);
        if (currentMap >= TOTAL_LEVELS) {
            setGameState('gameWon');
        } else {
            setGameState('levelComplete');
        }
    }

    setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    lastTimeRef.current = timestamp;

  }, [gameState, catPos, lamps, checkInLight, updateBestTime, currentMap, completeLevel]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameLoop]);

  const handleJoystickMove = (data: { angle: number; distance: number }) => {
    joystickDataRef.current = data;
    if (gameState === 'idle' && data.distance > 0) {
      setGameState('playing');
      startTimeRef.current = Date.now();
    }
  };

  const handleJoystickEnd = () => {
    joystickDataRef.current = { angle: 0, distance: 0 };
  };

  const handleNextLevel = () => {
    if (currentMap < TOTAL_LEVELS) {
        setCurrentMap(currentMap + 1);
    }
  };

  const Cat = () => (
    <div
      className="absolute transition-opacity duration-300"
      style={{
        width: CAT_SIZE,
        height: CAT_SIZE,
        left: catPos.x - CAT_SIZE / 2,
        top: catPos.y - CAT_SIZE / 2,
        opacity: isInShadow ? 1 : 0.5,
      }}
    >
      {isInShadow ? (
        <div className="w-full h-full flex justify-center items-center flex-row gap-1.5">
          <div className="w-1.5 h-1 bg-green-400 rounded-full shadow-[0_0_8px_2px_#22c55e]"></div>
          <div className="w-1.5 h-1 bg-green-400 rounded-full shadow-[0_0_8px_2px_#22c55e]"></div>
        </div>
      ) : (
        <div className="relative w-full h-full">
            <div className="absolute w-[90%] h-[80%] bottom-0 left-1/2 -translate-x-1/2 bg-black rounded-t-lg"></div>
            <div className="absolute w-[70%] h-[70%] top-0 left-1/2 -translate-x-1/2 bg-black rounded-full"></div>
            <div className="absolute top-[4px] left-[6px] w-0 h-0 
                border-l-[5px] border-l-transparent
                border-r-[5px] border-r-transparent
                border-b-[7px] border-b-black">
            </div>
            <div className="absolute top-[4px] right-[6px] w-0 h-0 
                border-l-[5px] border-l-transparent
                border-r-[5px] border-r-transparent
                border-b-[7px] border-b-black">
            </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`relative ${mapConfig.backgroundColor} w-full max-w-[400px] aspect-[9/16] overflow-hidden shadow-2xl shadow-purple-500/30 rounded-2xl`}>
      {lamps.map(lamp => (
        <div
          key={lamp.id}
          className="absolute rounded-full"
          style={{
            left: lamp.x - lamp.radius,
            top: lamp.y - lamp.radius,
            width: lamp.radius * 2,
            height: lamp.radius * 2,
            background: 'radial-gradient(circle, rgba(255, 245, 200, 0.25) 20%, transparent 60%)',
            boxShadow: 'inset 0 0 10px rgba(255, 245, 200, 0.1)',
          }}
        />
      ))}
      <div className="absolute top-0 w-full h-10 bg-gradient-to-b from-green-500/50 to-transparent z-10"></div>
      
      <Cat />

      <div className="absolute top-5 right-5 bg-black/50 p-2 rounded-lg text-right">
        <div className="text-sm font-bold text-white">Level {currentMap}: {mapConfig.name}</div>
        <div className="text-lg text-cyan-300">{elapsedTime}s</div>
      </div>
      
      <div className="absolute bottom-10 left-10 z-20">
        <Joystick onMove={handleJoystickMove} onEnd={handleJoystickEnd} />
      </div>

      <Modal isOpen={gameState === 'gameOver'}>
        <h2 className="text-3xl font-bold text-red-500 mb-4">CAUGHT!</h2>
        <p className="text-gray-400 mb-6">The shadows couldn't hide you...</p>
        <button onClick={initializeLevel} className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold w-full mb-3">Try Again</button>
        <button onClick={onExit} className="bg-gray-600 text-white px-8 py-3 rounded-full font-bold w-full">Exit to Menu</button>
      </Modal>

      <Modal isOpen={gameState === 'levelComplete'}>
        <h2 className="text-3xl font-bold text-green-400 mb-4">LEVEL COMPLETE!</h2>
        <p className="text-gray-300 mb-2">Time: <span className="text-cyan-300">{elapsedTime}s</span></p>
        <button onClick={handleNextLevel} className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold w-full mb-3 mt-4">Next Level</button>
        <button onClick={onExit} className="bg-gray-600 text-white px-8 py-3 rounded-full font-bold w-full">Exit to Menu</button>
      </Modal>
      
      <Modal isOpen={gameState === 'gameWon'}>
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">MASTER OF SHADOWS!</h2>
        <p className="text-gray-300 mb-6">You've conquered the darkness.</p>
        <button onClick={onExit} className="bg-purple-500 text-white px-8 py-3 rounded-full font-bold w-full">Back to Menu</button>
      </Modal>
    </div>
  );
};

export default Game;