const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = (env, argv) => ({
    entry: {
        "assets/js/portal-polyfills.bundle": "./js/portal-polyfills.js",
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname),
    },
    plugins: argv.mode === "production" && compressImagePlugins
});

const compressImagePlugins = [
  new CopyPlugin({
      patterns: [
          {
              from: "assets/uncompressed-images",
              to({ context, absoluteFilename }) {
                  return "assets/img";
              },
          },
      ],
  }),
  new ImageMinimizerPlugin({
      minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                  ["gifsicle", { interlaced: true }],
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                  // Svgo configuration here https://github.com/svg/svgo#configuration
                  [
                      "svgo",
                      {
                          plugins: [
                              {
                                  name: "preset-default",
                                  params: {
                                      overrides: {
                                          removeViewBox: false,
                                          addAttributesToSVGElement: {
                                              params: {
                                                  attributes: [
                                                      {
                                                          xmlns: "http://www.w3.org/2000/svg",
                                                      },
                                                  ],
                                              },
                                          },
                                      },
                                  },
                              },
                          ],
                      },
                  ],
              ],
          },
      },
  }),
]
