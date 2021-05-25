const purge = process.env.NODE_ENV === "production" ? true : false;
const colors = require("tailwindcss/colors");

module.exports = {
  purge: { enabled: purge, content: ["./build/**/*.html"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "cs-white": "#F0F0F0",
        "cs-black": "#333333",
        "cs-blue": "#4B98C5",
      },
      width: {
        30: "35%",
      },
      zIndex: {
        "-10": "-10",
      },
    },
    fontFamily: {
      sans: ["Poppins ", "sans-serif"],
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "4rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
