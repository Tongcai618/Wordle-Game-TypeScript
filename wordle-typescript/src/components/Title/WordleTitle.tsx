import React from "react";
import styles from "./WordleTitle.module.css";

type LetterColor = "green" | "yellow" | "gray";

type Props = {
  text?: string;                  // default "WORDLE"
  colors?: LetterColor[];         // e.g. ["green","yellow","gray","green","yellow","gray"]
  className?: string;             // wrapper class
  as?: keyof React.JSX.IntrinsicElements; // default "h1"
};

const colorClassMap: Record<LetterColor, string> = {
  green: styles.letterGreen,
  yellow: styles.letterYellow,
  gray: styles.letterGray,
};

const WordleTitle: React.FC<Props> = ({
  text = "WORDLE",
  colors,
  className,
  as: Tag = "h1",
}) => {
  const chars = Array.from(text);
  const fallback = Array(chars.length).fill("gray") as LetterColor[];
  const applied = colors?.length === chars.length ? colors : fallback;

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={`${ch}-${i}`} className={colorClassMap[applied[i]]} aria-hidden="true">
          {ch}
        </span>
      ))}
    </Tag>
  );
};

export default WordleTitle;
