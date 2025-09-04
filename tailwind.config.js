/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // class toggle
  theme: {
    extend: {
      colors: {
        sriBlue: {
          DEFAULT: "#2563EB",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        sriTeal: "#0EA5A4",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "soft-md": "0 8px 24px rgba(37,99,235,0.12)",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(.19,1,.22,1)",
      },
    },
  },
  plugins: [],
};
