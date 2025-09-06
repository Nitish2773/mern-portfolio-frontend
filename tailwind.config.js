/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // class toggle
  theme: {
    extend: {
      colors: {
        sriBlue: {
          DEFAULT: "#2563EB", // main blue
          100: "#E5EEFF",
          200: "#B8D4FF",
          300: "#8AB9FF",
          400: "#5C9EFF",
          500: "#2563EB",  // buttons, links
          600: "#1D4ED8",  // darker hover
          700: "#173AB5",  // dark mode buttons
          800: "#122A8C",
          900: "#0D1C63",
          950: "#0A1448",
        },
        sriTeal: {
          DEFAULT: "#0EA5A4",
          50: "#DDFBF9",
          100: "#BBF7F4",
          200: "#80F0E9",
          300: "#4FE7DE",
          400: "#26DDD6",
          500: "#0EA5A4",  // main teal
          600: "#0B7C79",  // dark mode
          700: "#075554",
          800: "#043B3B",
          900: "#012525",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "soft-md": "0 8px 24px rgba(37,99,235,0.12)",
        "soft-md-dark": "0 8px 24px rgba(37,99,235,0.3)",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(.19,1,.22,1)",
      },
      backgroundImage: {
        "hero-gradient-light": "linear-gradient(to bottom, #E5EEFF, #ffffff, #DDFBF9)",
        "hero-gradient-dark": "linear-gradient(to bottom, #173AB5, #1D1D1D, #075554)",
      },
    },
  },
  plugins: [],
};
