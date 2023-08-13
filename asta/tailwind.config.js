module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',     // Up to 768px width
        'md': '768px',    // Up to 1024px width
        'lg': '1024px',   // Up to 1440px width (large desktops)
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

