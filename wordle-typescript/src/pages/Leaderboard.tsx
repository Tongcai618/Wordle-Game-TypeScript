import { useEffect, useState } from "react";
import { LeaderboardComp } from "../components/Leaderboard/LeaderboardComp";
import { getLeaderboardRank } from "../apis/leaderboard";
import styles from "./Leaderboard.module.css";
import Header from "../components/Header/Header";

export default function Leaderboard() {
    const [rankData, setRankData] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchRank = async () => {
            try {
                const res = await getLeaderboardRank();
                console.log(res);
                setRankData(res)
            } catch (err) {
                console.error(err + ": failed to fetch leaderboard rank");
            }

        }
        fetchRank();
    }, []);

    return (
        <>
            <Header />
            <div className={styles.pageWrapper}>
                <div className={styles.pageContainer}>
                    <h1>
                        <span className={styles.letterGreen}>W</span>
                        <span className={styles.letterYellow}>O</span>
                        <span className={styles.letterGray}>R</span>
                        <span className={styles.letterGreen}>D</span>
                        <span className={styles.letterYellow}>L</span>
                        <span className={styles.letterGray}>E</span>
                    </h1>
                    <h1 className={styles.pageTitle}>🏆 Daily Leaderboard</h1>

                    <LeaderboardComp rankData={rankData} />
                </div>
            </div>
        </>
    );
}
