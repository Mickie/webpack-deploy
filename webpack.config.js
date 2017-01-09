const webpack = require("webpack");
const cleanPlugin = require("clean-webpack-plugin");
const extractPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const production = process.env.NODE_ENV === "production";
const path = require("path");
const pkg = require("./package.json");

const pluginsDev = [
    //new cleanPlugin("builds"),
    new extractPlugin('main.css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        children: true,
        minChunks: 2
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        title: "indexTitle",
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
        filename: "sub.html",
        template: "./src/sub.html",
        title: "subTitle",
        chunks: ['sub']
    })
];

const pluginsProd = pluginsDev.concat([
    new cleanPlugin("buildsProd"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 51200 // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            warnings: false // Suppress uglification warnings
        },
        output: {
            comments: false
        }
    })
]);

module.exports = {
    devtool: production ? "source-map" : "cheap-eval-source-map",
    entry: production ? {
            index: "./src/js/index.js",
            sub: "./src/js/sub.js"
        } : {
            index: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server',
                "./src/js/index.js"],
            sub: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server',
                "./src/js/sub.js"]
        },
    output: production ? pkg.configs['production'] : pkg.configs['development'],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },

            //ejs will not work if not comment =_=||||
            //            {
            //                test: /\.html$/,
            //                loader: "html"
            //            },

            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                //                loader: "url-loader",
                //                query:{
                //                    limit:10000,
                //                    name:'images/[name].[ext]'
                //                }
                //below equivalent
                loader: 'url?limit=2000&name=[name]-[hash:8].[ext]'
            }
        ]
    },
    plugins: production ? pluginsProd : pluginsDev,
    devServer: production ? "" : {
            contentBase: './builds',
            hot: true
        }
}