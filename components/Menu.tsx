
import React from 'react';
import { useGameContext } from '../hooks/useGameContext';
import { TOTAL_LEVELS } from '../constants';

interface MenuProps {
  onStartGame: () => void;
  onSelectLevel: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, onSelectLevel }) => {
    const { completedLevels } = useGameContext();

  return (
    <div className="w-full h-full bg-[#0a0a12] flex flex-col justify-center items-center p-8 text-center">
        <div className="relative mb-8">
             <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur opacity-40"></div>
             <div className="relative w-48 h-48 bg-black rounded-full flex justify-center items-center">
                 <div className="w-20 h-20 flex justify-center items-center flex-row gap-4">
                    <div className="w-4 h-3 bg-green-400 rounded-full shadow-[0_0_12px_4px_#22c55e]"></div>
                    <div className="w-4 h-3 bg-green-400 rounded-full shadow-[0_0_12px_4px_#22c55e]"></div>
                </div>
             </div>
        </div>

      <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tighter">Shadow Cat</h1>
      <p className="text-lg text-gray-400 mb-8">Escape through the darkness.</p>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={onStartGame}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-xl text-lg transition-all transform hover:scale-105"
        >
          Start Game
        </button>
        <button
          onClick={onSelectLevel}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-4 px-4 rounded-xl text-lg transition-all transform hover:scale-105"
        >
          Select Level
        </button>
      </div>

       <div className="mt-12 text-center">
            <p className="text-cyan-300 font-bold text-xl">{completedLevels} / {TOTAL_LEVELS}</p>
            <p className="text-gray-500 text-sm">Levels Completed</p>
        </div>

        <div className="absolute bottom-6 text-gray-600 text-xs">
            Use joystick to move. Reach the top. Avoid the light.
        </div>
    </div>
  );
};

export default Menu;
