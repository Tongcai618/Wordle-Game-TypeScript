import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

export default function Signup() {
  const [username, setUsername] = useState(""); // 👈 new
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // Simulate signup logic
    console.log("Signup:", { username, email, password });
    navigate("/login");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftPane}>
        <h1>Join Us 🚀</h1>
        <p>Create your account and start exploring our platform today.</p>
      </div>
      <div className={styles.rightPane}>
        <form className={styles.signupCard} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className={styles.button} type="submit">
            Create Account
          </button>

          <p className={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
