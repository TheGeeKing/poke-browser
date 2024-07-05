const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deFaultPurple: "#646cff",
        legacyBlurple: "#7289da",
        darkBlurple: "#454FBF",
      },
    },
  },
  darkMode: "class", // 'media' || selector
  plugins: [nextui({})],
};
