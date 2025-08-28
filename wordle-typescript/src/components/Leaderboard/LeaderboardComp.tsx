import React from "react";
import styles from "./LeaderboardComp.module.css"; // use .module.css

interface LeaderboardProps {
  rankData: Record<string, number>;
}

export const LeaderboardComp: React.FC<LeaderboardProps> = ({ rankData }) => {
  const sortedScores = Object.entries(rankData).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div className={styles.leaderboardContainer}>
        <h2>Leaderboard</h2>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map(([email, score], index) => (
              <tr key={email}>
                <td>{index + 1}</td>
                <td>{email}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
