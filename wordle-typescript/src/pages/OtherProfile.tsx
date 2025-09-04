// src/pages/Profile.tsx  (self profile)
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Page from "../components/Ui/Page";
import { getOther, getOtherGameActivities } from "../apis/user";
import { useToken } from "../contexts/TokenContext";
import { useParams, useNavigate } from "react-router-dom";
import type { UserProfile } from "../types/user";
import type { GameDTO } from "../types/game";
import { useActivityMap } from "../hooks/useActivityMap";
import ProfileView from "../components/Profile/ProfileView";

const OtherProfile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [gameActivities, setGameActivites] = useState<GameDTO[] | null>(null);
    const [days, setDays] = useState<number>(7);
    const [loading, setLoading] = useState(true);
    const [activityLoading, setActivityLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const { clearToken } = useToken();
    const navigate = useNavigate();

    // Fetch my profile
    useEffect(() => {
        if (!username) {
            setErr("No username provided");
            return;
        }
        (async () => {
            try {
                setLoading(true);
                const otherProfile = await getOther(username); setProfile(otherProfile);
            } catch (e: any) {
                setErr(e?.response?.data?.message || "Failed to load my profile.");
            } finally { setLoading(false); }
        })();
    }, []);

    // Fetch the activity
    useEffect(() => {
        if (!username) {
            setErr("No username provided");
            return;
        }
        (async () => {
            try {
                setActivityLoading(true);
                const list = await getOtherGameActivities(username, days);
                setGameActivites(list);
            } catch (e: any) {
                setErr(e?.response?.data?.message || "Failed to load my game activities.");
            } finally { setActivityLoading(false); }
        })();
    }, [days]);

    const activityMap = useActivityMap(gameActivities);

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
export default OtherProfile;
