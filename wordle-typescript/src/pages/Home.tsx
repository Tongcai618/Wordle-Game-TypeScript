import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import WordleTitle from '../components/Title/WordleTitle';
import styles from './Home.module.css';
import Card from '../components/Ui/Card';
import RegularButton from '../components/Button/RegularButton';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/me");
        }
    }, [navigate]);

    return (
        <>
            <div className={styles.home}>

                <Card align='center'>
                    <WordleTitle
                        className={styles.title}
                        colors={["green", "yellow", "gray", "green", "yellow", "gray"]}
                    />
                    <p className={styles.homeSubtitle}>
                        Guess the word in 6 tries. Test your vocabulary and have fun!
                    </p>
                    <div className={styles.actions}>
                        <RegularButton variant="primary" onClick={() => navigate('/login')}>
                            Login
                        </RegularButton>
                        <RegularButton variant="secondary" onClick={() => navigate('/signup')}>
                            Sign up
                        </RegularButton>
                    </div>
                    <p className={styles.footer}>
                        Built with React + Spring Boot
                    </p>
                </Card>
            </div   >
        </>
    );
}
