module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "#212529",
        "bg-secondary": "#2A3036",
        "muted-main": "#E6E6E6",
        "muted-secondary": "#CCCCCC",
      }
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"), 
    require('tailwindcss-fluid-spacing'),
    require("tailwind-fluid-typography"),
  ],
};
