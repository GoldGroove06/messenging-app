/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   presets:[
    require("@radui/ui/themes/tailwind-presets/default.js")
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
