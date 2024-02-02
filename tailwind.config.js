/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0px)",
          },

          "50%": {
            transform: "translateX(calc(600px - 100%))",
          },

          "100%": {
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        slide: "slide 2s ease infinite",
      },
    },
  },
  plugins: [],
};
