import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import { GameProvider } from "./contexts/GameContext";
import { TokenProvider } from "./contexts/TokenContext";
import './App.css';
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <TokenProvider>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game" element={<Game />} />
          <Route path="/me"element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GameProvider>
    </TokenProvider>
  );
}

export default App;
