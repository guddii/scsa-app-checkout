const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const { dist, src } = require("./path");
const { preprocessor } = require("./loader");

module.exports = {
    entry: {
        main: path.resolve(__dirname, src + "/main.ts")
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, dist),
        filename: "[name].[hash].js"
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 4030,
        open: false
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: preprocessor.fileRegexp,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: preprocessor.loaderName,
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(process.env)
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: path.resolve(__dirname, src + "/index.html"),
            filename: "index.html"
        })
    ]
};
