import React from "react";
import styles from "./LeaderboardComp.module.css";
import { useNavigate } from "react-router-dom";

interface LeaderboardProps {
  rankData: Record<string, number>;
}

export const LeaderboardComp: React.FC<LeaderboardProps> = ({ rankData }) => {
  const sortedScores = Object.entries(rankData).sort((a, b) => b[1] - a[1]);
  const navigate = useNavigate();

  return (
    <>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map(([username, score], index) => {
            return (
              <tr
                key={username}
                className={styles.row}
                onClick={() => navigate(`/user/${username}`)}
              >
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.userCell}>
                  <div className={styles.avatar}>{username[0]}</div>
                  <span className={styles.username}>{username}</span>
                </td>
                <td className={styles.score}>{score}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  );
};

export default LeaderboardComp;
