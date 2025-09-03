import React from "react";
import styles from "./Ui.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number | string;
};

export default function Card({
  children,
  className = "",
  maxWidth = 860,
}: Props) {
  return (
    <section
      className={`${styles.card} ${className}`.trim()}
      style={{
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
      }}
    >
      {children}
    </section>
  );
}
