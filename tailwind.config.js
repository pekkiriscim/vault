/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        md: "0px 2px 4px -2px rgba(24, 24, 27, 0.06), 0px 4px 8px -2px rgba(24, 24, 27, 0.10)",
        "3xl":
          "0px 5px 5px -2.5px rgba(0, 0, 0, 0.04), 0px 32px 64px -12px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
