import React from "react";
import styles from "../../pages/Game.module.css";

interface EnterKeyProps {
    onEnterClick: () => void;
}


export const EnterKey: React.FC<EnterKeyProps> = ({ onEnterClick }) => (
    <button className={`${styles.key} ${styles["enter-key"]}`} onClick={onEnterClick}>
        ✓
    </button>
);