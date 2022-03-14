const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    "sgds": './src/sgds.js'
},
  mode: "development",
  output :{
    filename: "[name].js",
    path: path.resolve(__dirname,"./assets/js")
  },
  module: {
    rules: [
      {
        // sass -> css -> extract to dist/css
        test: /sgds\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: false,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name]/[name].css'
    }),
  ],
};