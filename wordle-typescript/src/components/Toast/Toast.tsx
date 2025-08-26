// src/components/Toast.tsx
import React, { useEffect } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number; // ms
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 180000 }) => {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div className={styles.toast}>
      <div className={styles.content}>{message}</div>
      <button className={styles.close} onClick={onClose}>×</button>
    </div>
  );
};
