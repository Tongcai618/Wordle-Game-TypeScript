import React from "react";
import styles from "./Ui.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number | string;
  align?: 'left' | 'center'
};

export default function Card({
  children,
  className = "",
  maxWidth = 860,
  align = "left"
}: Props) {
  return (
    <section
      className={`${styles.card} ${className}`.trim()}
      style={{
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        textAlign: align
      }}
    >
      {children}
    </section>
  );
}
