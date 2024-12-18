/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        raisin_black: {
          DEFAULT: "#211a1d",
          100: "#070506",
          200: "#0e0b0c",
          300: "#151012",
          400: "#1b1618",
          500: "#211a1d",
          600: "#55424a",
          700: "#876a76",
          800: "#b09aa4",
          900: "#d8cdd1",
        },
        electric_indigo: {
          DEFAULT: "#6320ee",
          100: "#130432",
          200: "#270865",
          300: "#3a0b97",
          400: "#4d0fc9",
          500: "#6320ee",
          600: "#844df2",
          700: "#a279f5",
          800: "#c1a6f8",
          900: "#e0d2fc",
        },
        medium_slate_blue: {
          DEFAULT: "#8075ff",
          100: "#06004a",
          200: "#0c0095",
          300: "#1300df",
          400: "#3d2bff",
          500: "#8075ff",
          600: "#9a91ff",
          700: "#b3acff",
          800: "#cdc8ff",
          900: "#e6e3ff",
        },
        magnolia: {
          DEFAULT: "#f8f0fb",
          100: "#3e154d",
          200: "#7c299b",
          300: "#b054d2",
          400: "#d4a2e6",
          500: "#f8f0fb",
          600: "#f9f2fc",
          700: "#fbf5fc",
          800: "#fcf9fd",
          900: "#fefcfe",
        },
        ash_gray: {
          DEFAULT: "#cad5ca",
          100: "#242e24",
          200: "#495d49",
          300: "#6d8b6d",
          400: "#9ab09a",
          500: "#cad5ca",
          600: "#d4ddd4",
          700: "#dee5de",
          800: "#e9eee9",
          900: "#f4f6f4",
        },
      },
    },
  },
  plugins: [],
};
