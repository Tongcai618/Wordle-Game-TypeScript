// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import styles from "./Profile.module.css";
import { getMe, getMyGameActivities } from "../apis/user";
import type { UserProfile } from "../types/user";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import type { GameDTO } from "../types/game";
import { useActivityMap } from "../hooks/useActivityMap";
import GameActivityHeatmap from "../components/Heatmap/GameActivityHeatMap";
import { formatDate } from "../utils/date";
import Card from "../components/Ui/Card";


const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myGameActivities, setMyGameActivites] = useState<GameDTO[] | null>(null);
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { clearToken, isAuthenticated } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const me = await getMe();
        console.log(me.email);
        setProfile(me);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Failed to load my profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch the game activites from the game history
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setActivityLoading(true);
        const myGameActivities = await getMyGameActivities(days);
        console.log(myGameActivities);
        setMyGameActivites(myGameActivities);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Failed to load my game activities.");
      } finally {
        setActivityLoading(false);
      }
    };

    fetchActivities();
  }, [days]);


  const initials = (profile?.username || profile?.email || "?")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase())
    .join("") || "?";

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className={styles.page}>
          <div className={styles.card}>You’re not signed in.</div>
        </main>
      </>
    );
  }
  // The activity map to generate the heatmap
  const activityMap = useActivityMap(myGameActivities);



  return (
    <>
      <Header />
      <main className={styles.page}>
        {loading && <div className={styles.card}>Loading your profile…</div>}
        {!loading && err && <div className={styles.error}>{err}</div>}

        {!loading && !err && profile && (
          <>
            <section className={styles.headerRow}>
              <div className={styles.avatar}>{initials}</div>
              <div className={styles.identity}>
                <div className={styles.name}>{profile.username || "Unnamed Player"}</div>
                <div className={styles.meta}>
                  {profile.email} • Joined{" "}
                  {formatDate(profile.createdAt)}
                </div>
              </div>
            </section>

            <section className={styles.grid}>
              <Card maxWidth={230} align="center">
                <div className={styles.label}>🏆 Wins</div>
                <div className={styles.winsRow}>
                  <div className={styles.winType}>
                    <div className={styles.winLabel}>Simple</div>
                    <div className={styles.winCount}>{profile.userStats?.simpleWins ?? 0}</div>
                  </div>
                  <div className={styles.winType}>
                    <div className={styles.winLabel}>Normal</div>
                    <div className={styles.winCount}>{profile.userStats?.normalWins ?? 0}</div>
                  </div>
                </div>
                <div className={styles.winsSubtitle}>
                  since {formatDate(profile.createdAt)}
                </div>
              </Card>

              <Card align="center">
                <div className={styles.label}>Game Activity</div>
                <div className={styles.value}>Last {days} Days</div>
                {/* Buttons to toggle day range */}
                {!activityLoading && (
                  <div className={styles.heatmapContainer}>
                    <div className={styles.buttonGroup}>
                      {[7, 30, 180].map((d) => (
                        <button
                          key={d}
                          onClick={() => setDays(d)}
                          className={days === d ? styles.activeButton : styles.inactiveButton}
                        >
                          {d} Days
                        </button>
                      ))}
                    </div>

                    <GameActivityHeatmap activityMap={activityMap} days={days} />
                  </div>
                )}

              </Card>


            </section>

            <section className={styles.actions}>
              <button className={styles.primary} onClick={() => navigate("/game")}>
                Play Now
              </button>
              <button className={styles.secondary} onClick={handleLogout}>
                Sign out
              </button>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Profile;
