const theme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "red-primary": "#981843",
        "red-secondary": "#6c6c6c",
        "amber-primary": "#BD8C52",
        "amber-secondary": "#cacaca",
        "yellow-primary": "#EDAD52",
        "yellow-secondary": "#F3DCBD",
        "blue-primary": "#090649",
        "blue-secondary": "#49adf7",
        "black-primary": "#040404",
        "white-primary": "#ffffff",
        "indigo-primary": "#5932EA",
      },
      backgroundImage: ({ theme }) => ({
        "purple-to-blue":
          "linear-gradient(to left, #3ab5b0 0%, #3d99be 31%, #56317a 100%)",
        "red-to-yellow": "linear-gradient(to left, #ff5858 0%, #f09819 100%)",
        "red-to-pink": "linear-gradient(to right, #ff0844 0%, #ffb199 100%)",
        "green-to-yellow":
          "linear-gradient(to right, #16a085 0%, #f4d03f 100%)",
        "blue-to-cyan":
          "linear-gradient(to right, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)",
        "green-to-green": "linear-gradient(to left, #0ba360 0%, #3cba92 100%)",
        "gradient-fuchsia":
          "linear-gradient(310deg," +
          theme("colors.purple.700") +
          "," +
          theme("colors.pink.500") +
          ")",
      }),
      fontFamily: {
        "document-font": ["Verdana", ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
