// src/components/Profile/ProfileView.tsx
import styles from "./ProfileView.module.css";
import Card from "../Ui/Card";
import RegularButton from "../Button/RegularButton";
import { formatDate } from "../../utils/date";
import type { UserProfile } from "../../types/user";
import GameActivityHeatmap from "../Heatmap/GameActivityHeatMap";

type Props = {
    profile: UserProfile;
    isSelf: boolean;
    loading?: boolean;
    error?: string | null;
    days?: number;
    setDays?: (d: number) => void;
    activityMap?: Record<string, number>;
    activityLoading?: boolean;
    onPlay?: () => void;
    onLogout?: () => void;
    onBack?: () => void;
};

export default function ProfileView({
    profile, isSelf, loading, error,
    days, setDays, activityMap, activityLoading,
    onPlay, onLogout, onBack
}: Props) {

    const initials = (profile?.username || profile?.email || "?")
        .split(/[\s@.]+/).filter(Boolean).slice(0, 2)
        .map(s => s[0]?.toUpperCase()).join("") || "?";

    if (loading) return <div className={styles.card}>Loading profile…</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!profile) return null;

    return (
        <>
            <section className={styles.headerRow}>
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.identity}>
                    <div className={styles.name}>{profile.username || "Unnamed Player"}</div>
                    <div className={styles.meta}>
                        {isSelf && profile.email ? <>{profile.email} • </> : null}
                        Joined {formatDate(profile.createdAt)}
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

                {isSelf && (
                    <Card align="center">
                        <div className={styles.label}>🎮 Game Activity</div>
                        <div className={styles.value}>Last {days} Days</div>

                        {!activityLoading && activityMap && setDays && (
                            <div className={styles.heatmapContainer}>
                                <div className={styles.buttonGroup}>
                                    {[7, 30, 180].map((d) => (
                                        <button key={d}
                                            onClick={() => setDays(d)}
                                            className={days === d ? styles.activeButton : styles.inactiveButton}>
                                            {d} Days
                                        </button>
                                    ))}
                                </div>
                                <GameActivityHeatmap activityMap={activityMap} days={days!} />
                            </div>
                        )}
                    </Card>
                )}
            </section>

            <section className={styles.actions}>
                {onBack && (
                    <RegularButton variant="ghost" onClick={onBack}>
                        ← Go Back
                    </RegularButton>
                )}
                {onPlay && <RegularButton variant="primary" onClick={onPlay}>Play Now</RegularButton>}
                {isSelf && onLogout && <RegularButton variant="secondary" onClick={onLogout}>Sign out</RegularButton>}

            </section>
        </>
    );
}
