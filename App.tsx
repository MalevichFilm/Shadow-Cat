
import React, { useState, useCallback } from 'react';
import { GameProvider, useGameContext } from './hooks/useGameContext';
import Menu from './components/Menu';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';

type View = 'menu' | 'level-select' | 'game';

const AppContent: React.FC = () => {
    const [view, setView] = useState<View>('menu');
    const { setCurrentMap, resetGameProgress } = useGameContext();

    const handleStartGame = useCallback(() => {
        resetGameProgress();
        setCurrentMap(1);
        setView('game');
    }, [resetGameProgress, setCurrentMap]);

    const handleSelectLevel = useCallback((level: number) => {
        setCurrentMap(level);
        setView('game');
    }, [setCurrentMap]);
    
    const handleExitGame = useCallback(() => {
        setView('menu');
    }, []);

    const renderView = () => {
        switch (view) {
            case 'menu':
                return <Menu onStartGame={handleStartGame} onSelectLevel={() => setView('level-select')} />;
            case 'level-select':
                return <LevelSelect onSelect={handleSelectLevel} onBack={() => setView('menu')} />;
            case 'game':
                return <Game onExit={handleExitGame} />;
            default:
                return <Menu onStartGame={handleStartGame} onSelectLevel={() => setView('level-select')} />;
        }
    };

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center font-sans text-white overflow-hidden">
            {renderView()}
        </div>
    );
};


// FIX: Changed the App component from a `function` declaration to a `const` arrow function.
// This style is more common in modern React and can help avoid subtle issues with
// type inference in some TypeScript configurations, resolving the error where GameProvider's
// children were not correctly recognized.
const App: React.FC = () => {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
}

export default App;
