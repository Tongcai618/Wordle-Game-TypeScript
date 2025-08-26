import React from "react";
import { FaBackspace } from "react-icons/fa";
import styles from "../../pages/Game.module.css";

interface CancelKeyProps {
    onCancelClick: () => void;
}

export const CancelKey: React.FC<CancelKeyProps> = ({ onCancelClick }) => (
    <button className={`${styles.key} ${styles["cancel-key"]}`} onClick={onCancelClick}>
        <FaBackspace />
    </button>
);