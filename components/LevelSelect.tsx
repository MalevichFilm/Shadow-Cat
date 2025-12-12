
import React from 'react';
import { useGameContext } from '../hooks/useGameContext';
import { MAPS } from '../constants';

interface LevelSelectProps {
  onSelect: (level: number) => void;
  onBack: () => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ onSelect, onBack }) => {
  const { completedLevels, bestTimes } = useGameContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="w-full h-full max-w-md bg-[#0a0a12] flex flex-col p-4">
      <div className="flex items-center justify-between mb-6 px-2">
        <button onClick={onBack} className="text-blue-400 hover:text-blue-300 text-lg">&larr; Back</button>
        <h1 className="text-3xl font-bold text-white">Select Level</h1>
        <div className="w-16"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {MAPS.map(map => {
          const isUnlocked = map.id <= completedLevels + 1;
          const isCompleted = map.id <= completedLevels;
          const bestTime = bestTimes[map.id];

          return (
            <button
              key={map.id}
              onClick={() => isUnlocked && onSelect(map.id)}
              disabled={!isUnlocked}
              className={`w-full p-4 rounded-lg text-left flex items-center justify-between transition-all duration-200
                ${isUnlocked ? 'bg-gray-800 hover:bg-gray-700 cursor-pointer' : 'bg-gray-900 opacity-50 cursor-not-allowed'}
              `}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center text-2xl font-bold mr-4 ${map.backgroundColor.replace('bg-','')}`}>
                  {isUnlocked ? map.id : '🔒'}
                </div>
                <div>
                  <h2 className={`font-bold text-lg ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{map.name}</h2>
                  <p className="text-sm text-gray-400">{map.lamps.length} Light Sources</p>
                </div>
              </div>
              <div className="text-right">
                {isCompleted && (
                  <div className="text-green-400 font-bold text-sm">✓ COMPLETED</div>
                )}
                {bestTime && (
                  <div className="text-sm text-cyan-300">Best: {formatTime(bestTime)}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect;
