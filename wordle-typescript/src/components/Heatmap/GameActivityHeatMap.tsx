import React from "react";
import styles from "./GameActivityHeatmap.module.css"; // or reuse Profile.module.css

interface GameActivityHeatmapProps {
    activityMap: Record<string, number>;
    days: number;
}

const getPastNDates = (n: number): string[] => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(d.toISOString().slice(0, 10)); // 'YYYY-MM-DD'
    }
    return dates;
};

const getColorLevel = (count: number): string => {
    if (count === 0) return "level-0";
    if (count === 1) return "level-1";
    if (count <= 3) return "level-2";
    if (count <= 5) return "level-3";
    return "level-4";
};

const GameActivityHeatmap: React.FC<GameActivityHeatmapProps> = ({ activityMap, days }) => {
    const pastDates = getPastNDates(days);

    // Hardcoded style configs for each range
    const config =
        days === 7
            ? { columns: 7, cellSize: 24, cellHeight: 24, gap: 6 }
            : days === 30
                ? { columns: 10, cellSize: 24, cellHeight: 24, gap: 4 }
                : { columns: 30, cellSize: 9, cellHeight: 9, gap: 0.5 };

    return (
        <div
            className={styles.heatmap}
            style={{
                gridTemplateColumns: `repeat(${config.columns}, ${config.cellSize}px)`,
                gap: `${config.gap}px`,
            }}
        >
            {pastDates.map((date) => {
                const count = activityMap[date] || 0;
                const colorClass = getColorLevel(count);
                return (
                    <div
                        key={date}
                        className={`${styles.dayCell} ${styles[colorClass]}`}
                        style={{
                            width: config.cellSize,
                            height: config.cellHeight,
                        }}
                    >
                        &nbsp;
                    </div>
                );
            })}
        </div>
    );
};

export default GameActivityHeatmap;
