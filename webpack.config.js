const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    "sgds": './src/sgds.js'
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname,"dist")
  },
  module: {
    rules: [
      {
        // sass -> css -> extract to dist/css
        test: /sgds\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      }
    ]
      
  },
  // minimiser only runs in --mode=production
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../sgds/sgds.css'
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: "./assets/uncompressed_images/", 
          to: "./assets/img/",
          force: true
        }
      ],
    }),
  ],
};