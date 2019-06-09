const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let config = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: {
        sgds: "./sgds-govtech/js/sgds.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "sgds-govtech/dist")
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // sass -> css -> extract to dist/css
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                // fonts -> file loader to dist/fonts
                test: /sgds-icons\.(svg|ttf|woff)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts",
                        publicPath: "fonts"
                    }
                }]
            },

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new OptimizeCssAssetsPlugin()
    );
    config.devtool = "source-map";
}
module.exports = config;