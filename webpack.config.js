const   path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/index.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.jst$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
        new webpack.HotModuleReplacementPlugin()
    ]
}