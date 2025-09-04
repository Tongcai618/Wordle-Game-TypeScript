import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./Game.module.css";
import { Header } from "../components/Header/Header";
import { useGame } from "../contexts/GameContext";
import type { GuessResult } from "../types/game";
import { mapFeedbackToColors, mergeKeyboardColors } from "../utils/keyboardColors";
import { Board } from "../components/Board/Board";
import { Keyboard } from "../components/Keyboard/Keyboard";
import { usePhysicalKeyboard } from "../hooks/usePhysicalKeyboard";
import { Toast } from "../components/Toast/Toast";
import { ModeButton } from "../components/Button/ModeButton";
import { getGameSolution } from "../apis/game";


// Main Game Component
export const Game: React.FC = () => {
    const [history, setHistory] = useState<GuessResult[]>(
        Array(6).fill({ guess: "", feedback: [] })
    );
    const [currentWord, setCurrentWord] = useState("");
    const [colors, setColors] = useState<Record<string, string | null>>({});
    const { game, startGame, refreshGame, submitGuess, setLevel, level } = useGame();
    const [toastMsg, setToastMsg] = useState<string | null>(null);

    useEffect(() => {
        startGame();
        // Clear all frontend state
        setHistory(Array(6).fill({ guess: "", feedback: [] }));
        setCurrentWord("");
        setColors({});
        setToastMsg(null);
        console.log("Game Started")
    }, []);

    const handleKey = (letter: string) => {
        if (currentWord.length >= 5) return;

        if (game?.finished) return;

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

                // Update the keyboard colors given the guess and feedback
                setColors(prev => mergeKeyboardColors(prev, mapFeedbackToColors(res.guess, res.feedback)));
                // Clear the current word for the next input
                setCurrentWord("");

                // if the answer is correct
                if (res.correct) {
                    setToastMsg(`🎉 You solved it: ${res.guess}!`);
                }
                else if (res.finished) {
                    const solution = await getGameSolution(res.gameId);
                    setToastMsg(`🤯 The word was ${solution.toUpperCase()}`)
                }
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

    const handleModeClick = async (newLevel: "SIMPLE" | "NORMAL") => {
        setLevel(newLevel);
        await refreshGame(newLevel);
        // Clear all frontend state
        setHistory(Array(6).fill({ guess: "", feedback: [] }));
        setCurrentWord("");
        setColors({});
        setToastMsg(null);

        console.log("Refreshed the game.")
    }

    // Listen to physical keyboard to input
    usePhysicalKeyboard({
        onLetter: handleKey,
        onEnter: handleEnter,
        onBackspace: handleCancel,
        disabled: game?.finished,
    });

    // Reset the game
    const resetGame = async () => {
        await refreshGame()
        // Clear all frontend state
        setHistory(Array(6).fill({ guess: "", feedback: [] }));
        setCurrentWord("");
        setColors({});
        setToastMsg(null);

        console.log("Refreshed the game.")
    };

    return (
        <>
            {/* <Header /> */}
            <Header />
            <div className={styles.game}>
                {/* NEW panel wraps board + keyboard */}
                <div className={styles.panel}>
                    <div className={styles["game-board"]}>
                        <Board history={history} />
                        <div className={styles.controls}>
                            <button
                                type="button"
                                className={styles.refresh}
                                onClick={(e) => {
                                    resetGame();
                                    (e.currentTarget as HTMLButtonElement).blur(); // remove focus
                                }}
                            >
                                <FontAwesomeIcon icon={faSyncAlt} />
                            </button>
                            <ModeButton
                                label="Simple"
                                mode="SIMPLE"
                                onClick={handleModeClick}
                                active={level === "SIMPLE"}
                            />
                            <ModeButton
                                label="Normal"
                                mode="NORMAL"
                                onClick={handleModeClick}
                                active={level === "NORMAL"}
                            />
                        </div>
                    </div>


                    <div className={styles["game-keyboard"]}>
                        <Keyboard onPlay={handleKey} handleCancel={handleCancel} handleEnter={handleEnter} colors={colors} />
                    </div>

                </div>

                {/*The Toast message when the answer is correct*/}
                {toastMsg && (
                    <Toast
                        message={toastMsg}
                        onClose={() => setToastMsg(null)}
                        duration={60000} // 1 minutes
                    />
                )}
            </div>
        </>
    );
};

export default Game;
