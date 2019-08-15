const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
    if (!env) env = {};
    // This object only for SGDS Main Library
    // Site config (Vue, ImageMin etc) is below this object
    let config = {
        mode: env.production ? "production" : "development",
        entry: {
            "js/sgds": "./sgds/index.js"
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
                            presets: ["@babel/preset-env"],
                            plugins: ["@babel/plugin-proposal-object-rest-spread"]
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
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
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
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                moduleFilename: ({ name }) => `${name.replace("js", "css")}.css`
            })
        ]
    };

    if (env.production) {
        config.plugins.push(new OptimizeCssAssetsPlugin());
        config.devtool = "source-map";
    }

    if (env.site) {
        config.entry["apps/build/vue-search-app"] = "./apps/src/search/vue-search-app.js";
        config.module.rules.push({
            test: /\.vue$/,
            loader: "vue-loader"
        });
        config.plugins.push(
            ...[
                new CopyWebpackPlugin([
                    {
                        from: "assets/uncompressed_images",
                        to: "assets/img"
                    }
                ]),
                // ImageminWebpackPlugin must be placed after CopyWebpackPlugin 
                // (or any other plugins that deal with images) in plugins array.
                new ImageminPlugin({
                    pngquant: {
                        quality: "95-100"
                    }
                }),
                new VueLoaderPlugin()
            ]
        );
    }

    return config;
};
