// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "./Profile.module.css";
import { getMe } from "../apis/user";
import type { UserProfile } from "../types/user";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
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
        setErr(e?.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
                  {new Date(profile.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </section>

            <section className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>Games Played</div>
                <div className={styles.value}>
                  {profile.userStats ? profile.userStats.wins /* temp until you add more */ : 0}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.label}>Wins</div>
                <div className={styles.value}>{profile.userStats?.wins ?? 0}</div>
              </div>

              {/* Add more when backend provides them */}
              {/* <div className={styles.card}><div className={styles.label}>Win Rate</div><div className={styles.value}>72%</div></div> */}
              {/* <div className={styles.card}><div className={styles.label}>Current Streak</div><div className={styles.value}>3</div></div> */}
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
