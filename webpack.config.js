const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'static',
}

let mode = 'development'
let target = 'web'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
    target = 'browserslist'
}

const plugins = [
    new HtmlWebpackPlugin({
        title: 'keyman24',
        template: `${PATHS.src}/index.html`,
        favicon: `${PATHS.src}/assets/img/favicon.ico`,
    }),
    new MiniCssExtractPlugin({
        filename: `${PATHS.assets}/css/[name].[contenthash].css`,
    }),
    new Dotenv({
        systemvars: true,
    }),
]

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
    mode,
    target,
    plugins,
    entry: {
        main: `${PATHS.src}/index.tsx`,
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}/js/[name].[contenthash].js`,
        assetModuleFilename: `${PATHS.assets}/[hash][ext][query]`,
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        open: {
            app: {
                name: 'Google Chrome',
            },
        },
        port: 3001,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}/img/[hash][ext][query]`,
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}/fonts/[hash][ext][query]`,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
