const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
let config = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: {
        "js/sgds": "./sgds/index.js",
        "assets/learn-development/learn-vue": "./apps/learn-vue/index.js",
        "assets/learn-development/learn-react": "./apps/learn-react/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-object-rest-spread"
                        ]
                    }
                }
            },
            {
                // sass -> css -> extract to dist/css
                test: /sgds\.s(a|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "/"
                        }
                    },
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                // fonts -> file loader to dist/fonts
                test: /sgds-icons\.(svg|ttf|woff)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts"
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => `${name.replace("js", "css")}.css`
        }),
        new VueLoaderPlugin()
    ]
};
if (process.env.NODE_ENV === "production") {
    config.plugins.push(new OptimizeCssAssetsPlugin());
    config.devtool = "source-map";
}
module.exports = config;
