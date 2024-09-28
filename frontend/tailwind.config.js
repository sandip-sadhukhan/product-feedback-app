/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#AD1FEA",
        'dark-blue': "#4661E6",
        'darkest-blue': "#373F68",
        'light-blue': "#F2F4FF",
        'lightest-blue': "#F7F8FD",
        'secondary-blue': "#3A4374",
        'secondary-blue-dim': "#647196",
        'light-orange': "#F49F85",
        'sky-blue': "#62BCFA",
      },
      fontFamily: {
        'sans': ["Jost", "sans-serif"]
      }
    },
  },
  plugins: [],
};
