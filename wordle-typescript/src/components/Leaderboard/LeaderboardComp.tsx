import React from "react";
import styles from "./LeaderboardComp.module.css";

interface LeaderboardProps {
  rankData: Record<string, number>;
}

export const LeaderboardComp: React.FC<LeaderboardProps> = ({ rankData }) => {
  const sortedScores = Object.entries(rankData).sort((a, b) => b[1] - a[1]);

  // Helper to extract initials from email
  const getInitials = (email: string) => {
    const namePart = email.split("@")[0];
    const pieces = namePart.split(/[.\-_]/); // split on common separators
    const initials = pieces.map((p) => p[0]?.toUpperCase() ?? "").slice(0, 2);
    return initials.join("");
  };

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
          {sortedScores.map(([email, score], index) => {
            const initials = getInitials(email);
            return (
              <tr key={email}>
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.userCell}>
                  <div className={styles.avatar}>{initials}</div>
                  <span className={styles.email}>{email}</span>
                </td>
                <td className={styles.score}>{score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LeaderboardComp;
