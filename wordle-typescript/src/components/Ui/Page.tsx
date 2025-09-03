import React from "react";
import styles from "./Ui.module.css";

type Props = {
  children: React.ReactNode;
  align?: "left" | "center";       // default: center
  className?: string;
  as?: keyof React.JSX.IntrinsicElements; // default: main
};

export default function Page({
  children,
  align = "center",
  className = "",
  as: Tag = "main",
}: Props) {
  const alignClass = align === "left" ? styles.left : styles.center;

  return (
    <Tag className={`${styles.page} ${alignClass} ${className}`}>
      {children}
    </Tag>
  );
}
