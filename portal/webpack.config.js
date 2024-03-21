const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({
    entry: {
        "assets/custom-css/style.css": "./js/style.js",
        "assets/js/portal-polyfills.bundle": "./js/portal-polyfills.js",
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname),
    },
    module: {
        rules: [
            {
                // sass -> css -> extract to dist/css
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    plugins:
        argv.mode === "production"
            ? compressImagePlugins
            : [
                  new MiniCssExtractPlugin({
                      filename: "./assets/custom-css/style.css",
                  }),
              ],
});

const compressImagePlugins = [
    new MiniCssExtractPlugin({
        filename: "./assets/custom-css/style.css",
    }),
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
];
