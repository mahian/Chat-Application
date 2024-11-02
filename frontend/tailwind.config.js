/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6b8afd",
        secondary: "#e8e8e8",
        dark: "#212328",
        danger: "#eb3330",
        success: "#4aac68",
      },
    },
  },
  plugins: [],
};
