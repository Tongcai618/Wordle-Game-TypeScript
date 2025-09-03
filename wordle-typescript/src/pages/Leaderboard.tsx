import { useEffect, useState } from "react";
import { LeaderboardComp } from "../components/Leaderboard/LeaderboardComp";
import { getLeaderboardRank } from "../apis/leaderboard";
import styles from "./Leaderboard.module.css";
import Header from "../components/Header/Header";
import Page from "../components/Ui/Page";
import Card from "../components/Ui/Card";

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
            <Page align='center'>
                <Card>
                    <h1 className={styles.pageTitle}>🏆 Daily Leaderboard</h1>
                    <LeaderboardComp rankData={rankData} />
                </Card>
            </Page>
        </>
    );
}
