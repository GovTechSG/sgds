const path = require("path");

module.exports = {
  entry: {
    "assets/js/portal-polyfills.bundle": './js/portal-polyfills.js',
  },
  devtool: 'source-map',
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname)
  },
  plugins: [
  ],
};