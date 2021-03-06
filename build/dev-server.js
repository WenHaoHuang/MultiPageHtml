const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.base.conf.js');
const options = {
    contentBase: './src',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});