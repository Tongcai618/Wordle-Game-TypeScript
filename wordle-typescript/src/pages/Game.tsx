import React, { useEffect, useState, useCallback } from "react";
import { FaBackspace } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./Game.module.css";
import { Header } from "../components/Header";
import { useGame } from "../contexts/GameContext";
import type { GuessResult } from "../types/game";


const COLOR_PRIORITY: Record<string, number> = {
    grey: 0,
    yellow: 1,
    green: 2,
};



// Props Interfaces
interface GridProps {
    value: string | null;
    color: string | null;
}

interface KeyProps {
    letter: string;
    onKeyClick: () => void;
    color: string | null;
}

interface EnterKeyProps {
    onEnterClick: () => void;
}

interface CancelKeyProps {
    onCancelClick: () => void;
}

interface BoardProps {
    history: GuessResult[];
}

interface KeyboardProps {
    onPlay: (letter: string) => void;
    handleCancel: () => void;
    handleEnter: () => void;
    colors: Record<string, string | null>;
}

// Components
const Grid: React.FC<GridProps> = ({ value, color }) => {
    const gridClass = `${styles.grid} ${color ? styles[color] : ""}`;
    return <div className={gridClass}>{value}</div>;
};

const Key: React.FC<KeyProps> = ({ letter, onKeyClick, color }) => {
    const keyClass = `${styles.key} ${color ? styles[color] : ""}`;
    return (
        <button className={keyClass} onClick={onKeyClick}>
            {letter}
        </button>
    );
};

const EnterKey: React.FC<EnterKeyProps> = ({ onEnterClick }) => (
    <button className={`${styles.key} ${styles["enter-key"]}`} onClick={onEnterClick}>
        ✓
    </button>
);

const CancelKey: React.FC<CancelKeyProps> = ({ onCancelClick }) => (
    <button className={`${styles.key} ${styles["cancel-key"]}`} onClick={onCancelClick}>
        <FaBackspace />
    </button>
);

const Board: React.FC<BoardProps> = ({ history }) => {
    const rows = [];

    for (let i = 0; i < 6; i++) {
        const guessEntry = history[i];
        const guess = guessEntry?.guess ?? "";
        const feedback = guessEntry?.feedback ?? [];

        const row = [];

        for (let j = 0; j < 5; j++) {
            const letter = guess[j] ?? null;
            const color = feedback[j]?.toLowerCase() ?? null;
            row.push(<Grid key={j} value={letter} color={color} />);
        }

        rows.push(
            <div key={i} className={styles["board-row"]}>
                {row}
            </div>
        );
    }

    return <>{rows}</>;
};


const Keyboard: React.FC<KeyboardProps> = ({ onPlay, handleCancel, handleEnter, colors }) => {
    const handleKeyClick = (letter: string) => onPlay(letter);

    const renderKeyRow = (keys: string[]) => (
        <div className={styles["key-row"]}>
            {keys.map((letter) => {
                const upperLetter = letter.toUpperCase();
                const color = colors[upperLetter] ?? null;
                console.log("Key:", upperLetter, "Color:", color);
                return (<Key key={letter}
                    letter={letter}
                    onKeyClick={() => handleKeyClick(letter)}
                    color={color}
                />)
            })}
        </div>
    );

    return (
        <>
            {renderKeyRow(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"])}
            {renderKeyRow(["A", "S", "D", "F", "G", "H", "J", "K", "L"])}
            <div className={styles["key-row"]}>
                <EnterKey onEnterClick={handleEnter} />
                {renderKeyRow(["Z", "X", "C", "V", "B", "N", "M"])}
                <CancelKey onCancelClick={handleCancel} />
            </div>
        </>
    );
};

// Main Game Component
export const Game: React.FC = () => {
    const [history, setHistory] = useState<GuessResult[]>(
        Array(6).fill({ guess: "", feedback: [] })
    );

    const [currentWord, setCurrentWord] = useState("");
    const [colors, setColors] = useState<Record<string, string | null>>({});


    const { gameId, game, startGame, refreshGame, submitGuess, loading } = useGame();

    useEffect(() => {
        if (!gameId) startGame();
        console.log("gameid " + gameId)
    }, []);

    const handleKey = (letter: string) => {
        if (currentWord.length >= 5) return;

        const newWord = currentWord + letter.toUpperCase();
        setCurrentWord(newWord);

        const newHistory = [...history];
        const currentTry = game?.tries ?? 0;

        // Update the current guess string
        newHistory[currentTry] = {
            ...newHistory[currentTry],
            guess: newWord,
        };

        setHistory(newHistory);
    };

    const mergeKeyboardColors = (
        prev: Record<string, string | null>,
        next: Record<string, string | null>
    ): Record<string, string | null> => {
        const updated: Record<string, string | null> = { ...prev };

        for (const rawLetter in next) {
            const letter = rawLetter.toUpperCase(); // Normalize key to uppercase
            const newColorRaw = next[rawLetter];
            const newColor = newColorRaw?.toLowerCase() ?? null;

            const currentColorRaw = prev[letter];
            const currentColor = currentColorRaw?.toLowerCase() ?? null;

            const newPriority = COLOR_PRIORITY[newColor ?? ""] ?? -1;
            const currentPriority = COLOR_PRIORITY[currentColor ?? ""] ?? -1;

            if (newPriority > currentPriority) {
                updated[letter] = newColor;
            }
        }

        return updated;
    };




    const handleEnter = async () => {
        if (currentWord.length !== 5) {
            alert("Please enter a 5-letter word.");
            return;
        }

        try {
            const res = await submitGuess(currentWord);
            console.log("GuessOutcome:", res);

            if (res) {
                const currentTry = game?.tries ?? 0;

                // Update the history with the new guess result
                const newHistory = [...history];
                newHistory[currentTry] = {
                    guess: res.guess,
                    feedback: res.feedback,
                };
                setHistory(newHistory);

                // Update keyboard colors
                setColors(prev => mergeKeyboardColors(prev, res.keyboardColors));

                // Clear the current word for the next input
                setCurrentWord("");
            }
        } catch (err) {
            console.error("Failed to submit guess:", err);
        }
    };

    const handleCancel = () => {
        if (currentWord.length === 0) return;

        const newWord = currentWord.slice(0, -1);
        setCurrentWord(newWord);

        const currentTry = game?.tries ?? 0;

        // Update the current row's guess in history
        const newHistory = [...history];
        const existingFeedback = newHistory[currentTry]?.feedback ?? [];

        newHistory[currentTry] = {
            guess: newWord,
            feedback: existingFeedback, // feedback remains the same until submit
        };

        setHistory(newHistory);
    };


    const resetGame = () => {
        // Placeholder logic
    };

    return (
        <>
            {/* <Header /> */}
            <Header />
            <div className={styles.game}>
                <div className={styles["game-board"]}>
                    <Board history={history} />
                    <button className={styles.refresh} onClick={resetGame}>
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                </div>
                <div className={styles["game-keyboard"]}>
                    <Keyboard onPlay={handleKey} handleCancel={handleCancel} handleEnter={handleEnter} colors={colors} />
                </div>
            </div>
        </>
    );
};

export default Game;
