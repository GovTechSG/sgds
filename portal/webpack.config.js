const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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