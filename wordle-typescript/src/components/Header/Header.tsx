import React from "react";
import wordleLogo from "../../../public/wordle-icon.png";
import styles from "./Header.module.css";
import { useToken } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";

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
            <img src={wordleLogo} alt="Wordle Logo" className={styles.logo} />
            
            <Link to="/game" className={styles.gameTitle}>Wordle Game</Link>
            
            <nav className={styles.navigation}>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                {isAuthenticated && username ? (
                    <Link to="/me" className={styles.username}>
                        {username}
                    </Link>
                ) : (
                    <Link to="/login">Sign in</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
