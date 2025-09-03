import styles from './About.module.css';
import RegularButton from '../components/Button/RegularButton';
import Header from '../components/Header/Header';
import Page from '../components/Ui/Page';
import Card from '../components/Ui/Card';
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Page>
        <Card>
          <h1 className={styles.title}>About This Game</h1>
          <p className={styles.lead}>
            Welcome to <strong>Wordle</strong> — a fun word guessing game built with React and Spring Boot!
            Guess the 5-letter word in 6 tries. Each guess gives you color-coded feedback.
          </p>

          <section className={styles.section}>
            <h2 className={styles.h2}>How to Play</h2>
            <ul className={styles.list}>
              <li>Type a 5-letter word and press Enter</li>
              <li><span className={styles.badgeGreen}>Green</span> = correct letter & position</li>
              <li><span className={styles.badgeYellow}>Yellow</span> = correct letter, wrong position</li>
              <li><span className={styles.badgeGray}>Grey</span> = letter not in word</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Tech Stack</h2>
            <div className={styles.pills}>
              <span className={styles.pill}>React</span>
              <span className={styles.pill}>TypeScript</span>
              <span className={styles.pill}>CSS Modules</span>
              <span className={styles.pill}>Spring Boot</span>
              <span className={styles.pill}>Redis</span>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Credits</h2>
            <p>Created by Tong Cai © 2025</p>
            <div className={styles.linksRow}>
              <a className={styles.linkButton} href="https://github.com/Tongcai618/Wordle-Game-TypeScript" target="_blank" rel="noreferrer">
                Frontend Code <span aria-hidden>↗</span>
              </a>
              <a className={styles.linkButton} href="https://github.com/Tongcai618/Wordle-Game-Backend" target="_blank" rel="noreferrer">
                Backend Code <span aria-hidden>↗</span>
              </a>
            </div>
          </section>

        </Card>
        
        <section className={styles.actions}>
          <RegularButton variant="primary" onClick={() => navigate("/game")}>
            Back to Game
          </RegularButton>

          <RegularButton variant="secondary" onClick={() => navigate("/contact")}>
            Contact Me
          </RegularButton>
        </section>
        
      </Page>
    </>
  );
}
