
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: "source-map",
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            usePostCSS: true
        })
    },
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root:utils.resolve('')
        }),
        new webpack.DefinePlugin({
            'process.env': "'production'"
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {safe: true, map: {inline: false}}
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin("static/css/[name].css?v=[hash:4]"),
    ]
})


module.exports = webpackConfig