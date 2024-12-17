module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#3b82f6',
          800: '#1e3a8a',
        },
        gray: {
          100: '#f3f4f6',
          800: '#374151',
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#f9fafb',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables dark mode toggle by class
}
