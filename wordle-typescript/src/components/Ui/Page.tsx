import React from "react";
import styles from "./Ui.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements; // default: main
};

export default function Page({
  children,
}: Props) {
  return (
    < main className={`${styles.page}`}>
      {children}
    </main>
  );
}
