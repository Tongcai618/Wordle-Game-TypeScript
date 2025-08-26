import React from "react";
import styles from "../../pages/Game.module.css";

interface GridProps {
    value: string | null;
    color: string | null;
}

export const Grid: React.FC<GridProps> = ({ value, color }) => {
    const gridClass = `${styles.grid} ${color ? styles[color] : ""}`;
    return <div className={gridClass}>{value}</div>;
};