// utils/keyboardColors.ts


// The color priority for each color
export const COLOR_PRIORITY: Record<string, number> = {
    grey: 1,
    yellow: 2,
    green: 3,
};

// A helper function to generate a "next" color record given the guess and feedback
export const mapFeedbackToColors = (
    guess: string,
    feedback: string[]
): Record<string, string | null> => {
    const result: Record<string, string | null> = {};
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i].toUpperCase();
        const color = feedback[i].toLowerCase();
        result[letter] = color;
    }
    return result;
};

// Replace the old color with the new "next" color record
export const mergeKeyboardColors = (
    prev: Record<string, string | null>,
    next: Record<string, string | null>
): Record<string, string | null> => {
    const updated: Record<string, string | null> = { ...prev };

    for (const letter in next) {
        const newColor = next[letter]?.toLowerCase() ?? null;
        const currentColor = prev[letter]?.toLowerCase() ?? null;

        const newPriority = COLOR_PRIORITY[newColor!] ?? -1;
        const currentPriority = COLOR_PRIORITY[currentColor!] ?? -1;

        if (newPriority > currentPriority) {
            updated[letter] = newColor;
        }
    }

    return updated;
};
