const path = require('path')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries(),
    output: {
        path: utils.resolve('dist'),
        filename: 'static/js/[name].js?v=[hash:4]',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': utils.resolve('src'),
            'components': utils.resolve('src/components'),
            'assets': utils.resolve('src/assets'),
            'layout': utils.resolve('src/layout'),
            'libs': utils.resolve('src/libs')
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: utils.resolve('src/libs'),
                to: 'static/libs',
                ignore: ['.*']
            },
            {
                from: utils.resolve('static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new ExtractTextPlugin("static/css/[name].css?v=[hash:4]"),
    ].concat(utils.htmlPlugin()),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [utils.resolve('src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[ext]?v=[hash:4]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[ext]?v=[hash:4]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]?v=[hash:4]')
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {minimize: true}
                        },
                        {loader: 'postcss-loader'}
                    ],
                    publicPath: '../'
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {minimize: true}
                        },
                        {loader: 'sass-loader'},
                        {loader: 'postcss-loader'}
                    ],
                    publicPath: '../'
                })
            },
        ]
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}