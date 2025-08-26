import React from "react";
import wordleLogo from "../assets/wordle-icon.png";
import styles from "./Header.module.css"; // <-- use CSS module

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={wordleLogo} alt="Wordle Logo" className={styles.logo} />
      <div>Wordle Game</div>
      <nav className={styles.navigation}>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
