import React from "react";
import wordleLogo from "../../../public/wordle-icon.png";
import styles from "./Header.module.css";
import { useToken } from "../../contexts/TokenContext";

export const Header: React.FC = () => {
    const { token, isAuthenticated } = useToken();

    // For demo: extract username from token if it's a JWT
    // (if you already store username separately in context, just use that)
    let username: string | null = null;
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
            username = payload?.sub || payload?.email || null; // adjust based on the backend
        } catch {
            username = null;
        }
    }

    return (
        <header className={styles.header}>
            <img src={wordleLogo} alt="Wordle Logo" className={styles.logo} />
            <a href="/game" className={styles.username}> Wordle Game</a>
            <nav className={styles.navigation}>
                <a href="/about">About</a>
                <a href="#contact">Contact</a>
                {isAuthenticated && username ? (
                    <a href="/me" className={styles.username}>
                        {username}
                    </a>
                ) : (
                    <a href="/login">Sign in</a>
                )}
            </nav>
        </header>
    );
};

export default Header;
