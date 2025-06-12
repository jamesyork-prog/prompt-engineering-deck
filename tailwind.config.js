// /Users/james.york/Documents/GitHub/prompt-engineering-deck/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",      // Scans all .html files in the root directory
    "./js/**/*.js",  // Scans all .js files in the js folder and its subdirectories
    // Add any other file paths here if you use Tailwind classes elsewhere
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      // For example, if you had custom colors in your main.css like text-flash-coral,
      // you might define them here for consistency and to leverage Tailwind's utilities:
      colors: {
        'flash-coral': '#FF555E',
        'flash-black': '#000000',
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
}
