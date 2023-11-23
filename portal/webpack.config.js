const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "assets/js/tooltip.bundle": './js/tooltip.js',
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