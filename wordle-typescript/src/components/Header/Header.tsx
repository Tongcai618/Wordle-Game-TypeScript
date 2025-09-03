import React from "react";
import styles from "./Header.module.css";
import { useToken } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import WordleTitle from "../Title/WordleTitle";

export const Header: React.FC = () => {
    const { token, isAuthenticated } = useToken();

    let username: string | null = null;
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            username = payload?.sub || payload?.email || null;
        } catch {
            username = null;
        }
    }

    return (
        <header className={styles.header}>

            {/* Brand (left) */}
            <Link to="/game" className={styles.gameTitle}>
                <WordleTitle
                    className={styles.title}
                    colors={["green", "yellow", "gray", "green", "yellow", "gray"]}
                />
            </Link>

            {/* Nav (center) */}
            <nav className={styles.navigation}>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/leaderboard">Leaderboard</Link>
            </nav>
            {/* User (right) */}
            {isAuthenticated && username ? (
                    <Link to="/me" className={styles.username}>
                        {username}
                    </Link>
                ) : (
                    <Link to="/login">Sign in</Link>
                )}

        </header>
    );
};

export default Header;
