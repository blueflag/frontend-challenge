/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        attempt: "#F9DCC4",
        complete: "#B8E1E7",
        fail: "#F8C2C2",
        pass: "#B1D8B7",
        enrol: "#F3E7C8",
        attend: "#D1D1E9",
      },
    },
  },
  plugins: [],
};
