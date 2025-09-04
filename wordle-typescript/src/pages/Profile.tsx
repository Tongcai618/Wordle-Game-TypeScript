// src/pages/Profile.tsx  (self profile)
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Page from "../components/Ui/Page";
import styles from "./Profile.module.css";
import { getMe, getMyGameActivities } from "../apis/user";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../types/user";
import type { GameDTO } from "../types/game";
import { useActivityMap } from "../hooks/useActivityMap";
import ProfileView from "../components/Profile/ProfileView";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myGameActivities, setMyGameActivites] = useState<GameDTO[] | null>(null);
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { clearToken, isAuthenticated } = useToken();
  const navigate = useNavigate();

  // Fetch my profile
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const me = await getMe(); setProfile(me);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Failed to load my profile.");
      } finally { setLoading(false); }
    })();
  }, []);

  // Fetch the activity
  useEffect(() => {
    (async () => {
      try {
        setActivityLoading(true);
        const list = await getMyGameActivities(days);
        setMyGameActivites(list);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Failed to load my game activities.");
      } finally { setActivityLoading(false); }
    })();
  }, [days]);

  // A fallback page if not sign in
  if (!isAuthenticated) {
    return (<>
      <Header />
      <main className={styles.page}>
        <div className={styles.card}>
          You’re not signed in.
        </div>
      </main>
    </>);
  }

  const activityMap = useActivityMap(myGameActivities);

  return (
    <>
      <Header />
      <Page>
        <ProfileView
          profile={profile as UserProfile}
          isSelf
          loading={loading}
          error={err}
          days={days}
          setDays={setDays}
          activityMap={activityMap}
          activityLoading={activityLoading}
          onPlay={() => navigate("/game")}
          onLogout={() => { clearToken(); navigate("/login"); }}
        />
      </Page>
    </>
  );
};
export default Profile;
