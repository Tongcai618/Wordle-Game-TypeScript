import styles from './Contact.module.css';
import Header from '../components/Header/Header';
import Page from '../components/Ui/Page';
import Card from '../components/Ui/Card';

export default function Contact() {
    return (
        <>
            <Header />
            <Page align='center'>
                <Card>
                    <h1>Contact</h1>
                    <p>Feel free to reach out via email or LinkedIn:</p>

                    <ul className={styles.contactLinks}>
                        <li>
                            📧 Email:{" "}
                            <a href="mailto:tongcai010618@gmail.com">
                                tongcai010618@gmail.com
                            </a>
                        </li>
                        <li>
                            💼 LinkedIn:{" "}
                            <a
                                href="https://www.linkedin.com/in/tong-cai-4b1b00290/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                linkedin.com/in/tong-cai-4b1b00290
                            </a>
                        </li>
                    </ul>
                </Card>
            </Page>
        </>
    );
}
