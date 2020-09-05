const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = 
{
    entry: 
    {
        server: './bin/www',
    },
    output: 
    {
        path: path.join(__dirname, 'server-dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()],
    node: 
    {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    module: 
    {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}