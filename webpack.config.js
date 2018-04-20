const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackLayoutPlugin = require('html-webpack-layout-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/components/main.js',
        home: './src/components/home.js',
        aboutUs: './src/components/aboutUs.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    plugins: [

        new webpack.IgnorePlugin(/jsdom$/),

        // Clean the `dist` folder.
        new CleanWebpackPlugin(['extension']),

        // Copy assets to the extension' deployment dir.
        new CopyWebpackPlugin([{from: 'src/images/favicon/favicon.ico', to: 'images/favicon'}]),
        new CopyWebpackPlugin([{from: 'src/images/favicon/favicon-16x16.png', to: 'images/favicon'}]),
        new CopyWebpackPlugin([{from: 'src/images/favicon/favicon-32x32.png', to: 'images/favicon'}]),
        new CopyWebpackPlugin([{from: 'src/images/favicon/favicon-96x96.png', to: 'images/favicon'}]),
        new CopyWebpackPlugin([{from: 'src/images/spain.png', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/images/english.png', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/images/logo.png', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/images/menu.svg', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/images/down-arrow.svg', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/images/sample.mp4', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/images/gallery/design.png', to: 'images/gallery'}]),
        new CopyWebpackPlugin([{from: 'src/images/gallery/ecommerce.png', to: 'images/gallery'}]),
        new CopyWebpackPlugin([{from: 'src/images/gallery/elearning.png', to: 'images/gallery'}]),
        new CopyWebpackPlugin([{from: 'src/images/gallery/outsourcing.png', to: 'images/gallery'}]),
        new CopyWebpackPlugin([{from: 'src/images/gallery/webdev.png', to: 'images/gallery'}]),
        new CopyWebpackPlugin([{from: 'src/styles.css', to: ''}]),
        new CopyWebpackPlugin([{from: 'src/data/data.json', to: ''}]),

        // For Bootstrap
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            "window.$": "jquery",
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackLayoutPlugin(),
        new HtmlWebpackPlugin({
            layout: path.join(__dirname, './src/index.html'),
            template: path.join(__dirname, './src/components/home.html'),
            filename: 'home.html',
            inject: false,
            js: 'home.js',
        }),

        new HtmlWebpackPlugin({
            layout: path.join(__dirname, './src/index.html'),
            template: path.join(__dirname, './src/components/aboutUs.html'),
            filename: 'aboutUs.html',
            inject: false,
            js: 'aboutUs.js'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader",
                query: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: './'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
    ,
    externals: {
        'jsdom':
            'window'
    }
};