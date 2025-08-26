import React from "react";
import styles from "../../pages/Game.module.css";
import { Key } from "./Key";
import { EnterKey } from "./EnterKey";
import { CancelKey } from "./CancelKey";


interface KeyboardProps {
    onPlay: (letter: string) => void;
    handleCancel: () => void;
    handleEnter: () => void;
    colors: Record<string, string | null>;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onPlay, handleCancel, handleEnter, colors }) => {
    const handleKeyClick = (letter: string) => onPlay(letter);

    const renderKeyRow = (keys: string[]) => (
        <div className={styles["key-row"]}>
            {keys.map((letter) => {
                const upperLetter = letter.toUpperCase();
                const color = colors[upperLetter] ?? null;
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