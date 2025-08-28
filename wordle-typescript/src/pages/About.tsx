import styles from './About.module.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

export default function About() {
  return (
    <>
    <Header />
    <div className={styles.pageWrapper}>
    <div className={styles.aboutContainer}>
      <h1>About This Game</h1>
      <p>
        Welcome to <strong>Wordle</strong> — a fun word guessing game built with React and Spring Boot!
        Guess the 5-letter word in 6 tries. Each guess gives you color-coded feedback.
      </p>

      <h2>How to Play</h2>
      <ul>
        <li>Type a 5-letter word and press Enter</li>
        <li>Green = correct letter and position</li>
        <li>Yellow = correct letter, wrong position</li>
        <li>Grey = letter not in word</li>
      </ul>

      <h2>Tech Stack</h2>
      <ul>
        <li>Frontend: React + TypeScript + CSS Modules</li>
        <li>Backend: Spring Boot + Redis</li>
      </ul>

      <h2>Credits</h2>
      <p>Created by Tong Cai © 2025</p>
      <p><a href="https://github.com/Tongcai618/Wordle-Game-TypeScript" target="_blank" rel="noreferrer">View Frontend Code on GitHub</a></p>
      <p><a href="https://github.com/Tongcai618/Wordle-Game-Backend" target="_blank" rel="noreferrer">View Backend Code on GitHub</a></p>
      <Link to="/" className={styles.backButton}>← Back to Game</Link>
    </div>
    </div>
    </>
  );
}
