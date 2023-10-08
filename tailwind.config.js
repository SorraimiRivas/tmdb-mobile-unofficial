/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#0d253f",
      secondary: "#01b4e4",
      tertiary: "#90cea1",
      white: "#9ca3af",
      success: "#22c55e",
      danger: "#b91c1c",
      error: "#ef4444",
      gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        400: "#9ca3af",
      },
    },
  },
  plugins: [],
};
