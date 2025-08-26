import React from "react";
import styles from "../../pages/Game.module.css";


interface KeyProps {
    letter: string;
    onKeyClick: () => void;
    color: string | null;
}


export const Key: React.FC<KeyProps> = ({ letter, onKeyClick, color }) => {
    const keyClass = `${styles.key} ${color ? styles[color] : ""}`;
    return (
        <button className={keyClass} onClick={onKeyClick}>
            {letter}
        </button>
    );
};