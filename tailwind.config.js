module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./sections/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-primary": "#228be6",
        "accent-tinted": "#3897e9",
        "accent-shaded": "#1f7dcf",
        "bg-main": "#212529",
        "bg-secondary": "#2A3036",
        "muted-main": "#E6E6E6",
        "muted-secondary": "#CCCCCC",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [
    require("tailwindcss-fluid-spacing"),
    require("tailwind-fluid-typography"),
  ],
};
