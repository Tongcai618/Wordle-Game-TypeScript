import './Contact.css';
import Header from '../components/Header/Header';
export default function Contact() {
    return (
        <>
            <Header />
            <div className="contact-page">
                <div className="contact-panel">
                    <h1>Contact</h1>
                    <p>Feel free to reach out via email or LinkedIn:</p>

                    <ul className="contact-links">
                        <li>
                            📧 Email: <a href="mailto:tongcai010618@gmail.com">tongcai010618@gmail.com</a>
                        </li>
                        <li>
                            💼 LinkedIn: <a href="https://www.linkedin.com/in/tong-cai-4b1b00290/" target="_blank" rel="noopener noreferrer">
                                linkedin.com/in/tong-cai-4b1b00290
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
