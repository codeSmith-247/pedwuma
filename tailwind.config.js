/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    darkTheme: "light",
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}