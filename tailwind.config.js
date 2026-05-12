/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require("nativewind/preset")],
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./ui/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                surface: "#FFFFFF",
                "study-surface": "#F3FCF0",
                primary: "#007F3D",
                "primary-container": "#D8F8D2",
                "secondary-container": "#8CF5B2",
                "surface-container": "#E8F0E5",
                "surface-container-low": "#EEF6EB",
                "surface-container-lowest": "#FFFFFF",
                "surface-variant": "#DDE5DA",
                outline: "#6D7B6D",
                "on-surface": "#161D17",
                "on-surface-variant": "#4F5B53",
                "study-on-surface": "#161D17",
                "study-on-surface-variant": "#3D4A3E",
                "study-primary": "#006D36",
            },
            fontFamily: {
                "label-bold": ["System"],
            },
            fontWeight: {
                "label-bold": "700",
            },
            boxShadow: {
                lg: "0 -4px 12px rgb(0 0 0 / 0.14)",
                "study-flashcard": "0 10px 30px rgba(74, 222, 128, 0.08)",
                "study-flashcard-selected":
                    "0 10px 30px rgba(74, 222, 128, 0.15)",
                "study-flashcard-muted": "0 4px 12px rgba(22, 29, 23, 0.08)",
            },
        },
    },
    plugins: [],
};
