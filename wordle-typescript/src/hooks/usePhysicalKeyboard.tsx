import { useEffect } from "react";

// Create a listener to listen Keyboard input
export const usePhysicalKeyboard = ({
  onLetter,
  onEnter,
  onBackspace,
  disabled = false,
}: {
  onLetter: (char: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  disabled?: boolean;
}) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (disabled) return;

      const isTypingField =
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" ||
          e.target.tagName === "TEXTAREA" ||
          e.target.isContentEditable);

      if (isTypingField) return;

      const key = e.key;

      if (/^[a-zA-Z]$/.test(key)) {
        onLetter(key.toUpperCase());
      } else if (key === "Enter") {
        onEnter();
      } else if (key === "Backspace") {
        onBackspace();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [onLetter, onEnter, onBackspace, disabled]);
};
