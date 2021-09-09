const path = require('path');

console.log('craco')

module.exports = {
  webpack: {
    alias: {
      "@": path.join(path.resolve(__dirname, "./src")),
      "@components": path.join(path.resolve(__dirname, "./src/components")),
      "@api": path.join(path.resolve(__dirname, "./src/api")),
    },
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
