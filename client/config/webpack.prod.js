const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
require('dotenv').config({ silent: process.env.NODE_ENV === "production" });

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
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: preprocessor.loaderName
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(process.env)
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, dist), {
            root: process.cwd()
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
