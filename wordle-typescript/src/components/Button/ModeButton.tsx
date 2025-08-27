// src/components/ModeButton/ModeButton.tsx
import React from "react";
import styles from "./ModeButton.module.css";

interface ModeButtonProps {
    label: string;
    mode: "SIMPLE" | "NORMAL";
    onClick: (mode: "SIMPLE" | "NORMAL") => void;
    active?: boolean; // highlight current mode
}

export const ModeButton: React.FC<ModeButtonProps> = ({ label, mode, onClick, active }) => {
    const classNames = [
        styles.modeButton,
        active && (mode === "SIMPLE" ? styles.activeSimple : styles.activeNormal)
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={classNames}
            onClick={(e) => {
                onClick(mode);
                (e.currentTarget as HTMLButtonElement).blur(); // remove focus
            }}>
            {label}
        </button>
    );
};

