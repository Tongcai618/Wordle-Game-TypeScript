import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Home.css'; // we'll define this below

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-panel">
        <h1 className="home-title">Welcome to Wordle Game!</h1>
        <p className="home-subtitle">
          Guess the word in 6 tries. Test your vocabulary and have fun!
        </p>
        <div className="home-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
        <p className="home-footer">
          Built with React + Spring Boot
        </p>
      </div>
    </div>
  );
}
