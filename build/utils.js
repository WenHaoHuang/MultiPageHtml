const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

exports.resolve = (dir) => {
    return path.join(__dirname, '../', dir)
}
exports.assetsPath = function (_path) {
    const assetsSubDirectory = ''

    return path.posix.join(assetsSubDirectory, _path)
}
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: true,
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}
// 多入口配置
exports.entries = () => {

    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/index.js')
    const map = {}
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 2]
        map[pathName] = filePath
    })
    return map;
}
// 多页面输出配置
exports.htmlPlugin = () => {
    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/index.html')
    const arr = []
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 2]
        let conf = {
            template: filePath,
            filename: pathName + '.html',
            chunks: ['commons', pathName],
            inject: true,
            publicPath: '/' + pathName + '/',
            path: path.resolve(__dirname, '../dist'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr;
}
