import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        default: {
          50: "#080807",
          100: "#0c0c0b",
          200: "#10110f",
          300: "#151513",
          400: "#191a17",
          500: "#414240",
          600: "#6a6a68",
          700: "#929291",
          800: "#babab9",
          900: "#e2e2e2",
          foreground: "#fff",
          DEFAULT: "#191a17"
        },
        primary: {
          50: "#3e0101",
          100: "#630101",
          200: "#870101",
          300: "#ac0202",
          400: "#d00202",
          500: "#d82e2e",
          600: "#e05b5b",
          700: "#e98787",
          800: "#f1b3b3",
          900: "#f9dfdf",
          foreground: "#fff",
          DEFAULT: "#d00202"
        },
        secondary: {
          50: "#062f4c",
          100: "#0a4a78",
          200: "#0d65a4",
          300: "#1180d0",
          400: "#149bfc",
          500: "#3dadfd",
          600: "#66befd",
          700: "#8fd0fe",
          800: "#b9e1fe",
          900: "#e2f3ff",
          foreground: "#000",
          DEFAULT: "#149bfc"
        },
        success: {
          50: "#1c4c06",
          100: "#2c780a",
          200: "#3ca40d",
          300: "#4cd011",
          400: "#5cfc14",
          500: "#79fd3d",
          600: "#95fd66",
          700: "#b2fe8f",
          800: "#cefeb9",
          900: "#ebffe2",
          foreground: "#000",
          DEFAULT: "#5cfc14"
        },
        warning: {
          50: "#484643",
          100: "#726e69",
          200: "#9d9790",
          300: "#c7bfb7",
          400: "#f1e8de",
          500: "#f3ece4",
          600: "#f6f0ea",
          700: "#f8f4ef",
          800: "#fbf8f5",
          900: "#fdfcfb",
          foreground: "#000",
          DEFAULT: "#f1e8de"
        },
        danger: {
          50: "#4c4c06",
          100: "#78780a",
          200: "#a4a40d",
          300: "#d0d011",
          400: "#fcfc14",
          500: "#fdfd3d",
          600: "#fdfd66",
          700: "#fefe8f",
          800: "#fefeb9",
          900: "#ffffe2",
          foreground: "#000",
          DEFAULT: "#fcfc14"
        },
        twitch: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          foreground: "#fff",
          DEFAULT: "#9146FF"
        },
        kick: {
          50: "#eaffea",
          100: "#d4ffd4",
          200: "#baffba",
          300: "#9fff9f",
          400: "#85ff85",
          500: "#6aff6a",
          600: "#4fff4f",
          700: "#35ff35",
          800: "#1aff1a",
          900: "#00ff00",
          foreground: "#000",
          DEFAULT: "#53fc18"
        },
        background: "#000000",
        foreground: {
          50: "#4d4d48",
          100: "#797972",
          200: "#a6a69c",
          300: "#d2d2c6",
          400: "#fffff0",
          500: "#fffff3",
          600: "#fffff5",
          700: "#fffff8",
          800: "#fffffb",
          900: "#fffffd",
          foreground: "#000",
          DEFAULT: "#fffff0"
        },
        content1: {
          DEFAULT: "#18181b",
          foreground: "#fff"
        },
        content2: {
          DEFAULT: "#27272a",
          foreground: "#fff"
        },
        content3: {
          DEFAULT: "#3f3f46",
          foreground: "#fff"
        },
        content4: {
          DEFAULT: "#52525b",
          foreground: "#fff"
        },
        focus: "#59ffbd",
        overlay: "#ffffff",
        divider: "#e8e8e8"
      }
    }
  },
  darkMode: "class",
  plugins: [heroui()],
}
