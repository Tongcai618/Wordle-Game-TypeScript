import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import type { AuthResponse, SignupRequest } from "../types/auth";
import { signup } from "../apis/auth";
import { useToken } from "../contexts/TokenContext";

export default function Signup() {
    const { storeToken } = useToken();
    const [username, setUsername] = useState(""); // 👈 new
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        const data: SignupRequest = {
            username,
            email,
            password,
        };

        // sign up logic
        try {
            const res: AuthResponse = await signup(data);
            // optionally save token
            // localStorage.setItem("token", res.token);
            storeToken(res.token);
            console.log(res.token);
            navigate("/game");
        } catch (error: any) {
            console.error("Signup failed:", error);
            alert(error?.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.leftPane}>
                <h1>
                    <span className={styles.letterGreen}>W</span>
                    <span className={styles.letterYellow}>O</span>
                    <span className={styles.letterGray}>R</span>
                    <span className={styles.letterGreen}>D</span>
                    <span className={styles.letterYellow}>L</span>
                    <span className={styles.letterGray}>E</span>
                </h1>

                <p>Create your account and guess the word in 6 tries.</p>

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
                        🎯 Create Account
                    </button>

                    <p className={styles.footerText}>
                        Already have an account?{" "}
                        <Link to="/login" className={styles.link}>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
