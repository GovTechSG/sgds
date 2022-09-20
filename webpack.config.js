const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    entry: {
        "vue-search-app-full-site":
            "./apps/src/search/vue-search-app-full-site.js",
        "assets/sgds": "./src/sgds.js",
        "assets/js/bundle": "./src/sgds.bundle.js",
        "assets/js/vendor": "./src/sgds.vendor.js",
    },
    devtool: "source-map",
    mode: "development",
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
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
        ],
    },
    // minimiser only runs in --mode=production
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/sgds.css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "assets/uncompressed_images/",
                    to: "assets/img/",
                },
            ],
        }),
        new VueLoaderPlugin(),
    ],
};
