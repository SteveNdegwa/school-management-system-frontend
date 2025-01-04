/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  plugins: [
    flowbite.plugin(),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue
      }
    },
  },
  plugins: [],
}