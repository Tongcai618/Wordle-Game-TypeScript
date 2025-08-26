import React from "react";

import type { GuessResult } from "../../types/game";
import { Grid } from "./Grid"
import styles from "../../pages/Game.module.css";


interface BoardProps {
    history: GuessResult[];
}


export const Board: React.FC<BoardProps> = ({ history }) => {
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