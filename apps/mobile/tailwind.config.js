/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
  "./screens/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "../../packages/linguin-shared/**/*.{js,jsx,ts,tsx}",
  "../../packages/linguin-shared/components/*.{js,jsx,ts,tsx}",
  "../../packages/linguin-shared/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [],
}

