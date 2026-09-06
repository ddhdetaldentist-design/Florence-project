/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DFB163",
          hover: "#cfa152",
          dark: "#b88a3b",
          light: "#f0caa0",
        },
        secondary: {
          DEFAULT: "#252531",
          light: "#323242",
          dark: "#1A1A24",
        },
        dark: {
          DEFAULT: "#181818",
          card: "#1f1f23",
          border: "#2e2e38",
        },
        cream: "#FAF8F5",
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Montserrat", "sans-serif"],
        heading: ["var(--font-oswald)", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
