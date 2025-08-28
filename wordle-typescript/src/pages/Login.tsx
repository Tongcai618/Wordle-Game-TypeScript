import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import type { LoginRequest, AuthResponse } from "../types/auth";
import { login } from "../apis/auth";
import { useToken } from "../contexts/TokenContext";

export default function Login() {
    const { storeToken } = useToken();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: LoginRequest = {
            email,
            password,
        };

        try {
            const res: AuthResponse = await login(data);
            storeToken(res.token);
            console.log(res.token);
            navigate("/game")
        } catch (error: any) {
            console.error("Login failed:", error);
            alert(error?.response?.data?.message || "Login failed.");
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
                <p>Sign in to guess the word and track your daily progress 🎯</p>
            </div>
            <div className={styles.rightPane}>
                <form className={styles.loginCard} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Login</h2>
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
                    <button className={styles.button} type="submit">
                        Sign In
                    </button>
                    <p className={styles.footerText}>
                        Don't have an account?{" "}
                        <a href="/signup" className={styles.link}>
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
