const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = (env) => {
  if (!env) env = {};
  // This object only for SGDS Main Library
  // Site config (Vue, ImageMin etc) is below this object
  let config = {
    mode: env.production ? "production" : "development",
    entry: {
      "js/sgds": "./sgds/js/index.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules\/(?!(sticky-sidebar))/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: { ie: "11" } }]],
              plugins: ["@babel/plugin-proposal-object-rest-spread"],
            },
          },
        },
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
        },
        {
          // fonts -> file loader to dist/fonts
          test: /sgds-icons\.(svg|ttf|woff)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        moduleFilename: ({ name }) => `${name.replace("js", "css")}.css`,
      }),
    ],
  };

  if (env.production) {
    config.plugins.push(new OptimizeCssAssetsPlugin());
    config.devtool = "source-map";
  }

  if (env.site) {
    config.entry["apps/build/vue-search-app"] =
      "./apps/src/search/vue-search-app.js";
    config.entry["apps/build/main"] = "./apps/src/main";
    config.entry["apps/build/docs"] = "./apps/src/docs";
    config.module.rules.push(
      ...[
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"],
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
      ]
    );
    config.plugins.push(
      ...[
        new CopyPlugin({
          patterns: [{ from: "assets/uncompressed_images", to: "assets/img" }],
        }),
        new VueLoaderPlugin(),
      ]
    );
  }

  return config;
};
