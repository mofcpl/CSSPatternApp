const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports =
{

    entry: ['babel-polyfill', './src/index.js'],
    output: 
    {
        path: path.join(__dirname, 'site-dist'),
        publicPath: '/',
    },

    module:
    {
        
        rules:[
            {
                test: /\.html$/,
                use: [{loader: "html-loader", options: {minimize: true}}]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {loader: "babel-loader"}
            },
            {
                test: /\.(css|scss)$/,
                use: [ 'style-loader', 
                    MiniCssExtractPlugin.loader, 
                    {
                      loader: 'css-loader'
                    },
                    { loader: 'postcss-loader', options: { config: { path: 'src/postcss-config/' }}},
                    'sass-loader']
            },

            {
                test: /\.(png)$/, 
                use: [
                {
                  loader: "url-loader",
                  options: {
                    name: "./img/[name].[ext]",
                    limit: 10000
                  }
                },
          {
            loader: "img-loader"
          }
        ]
            },
            {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                limit: 4096,
                name: './fonts/[name].[ext]?[hash]', // was '/fonts/[name].[ext]?[hash]',
              },
            },
        ]
    },
    
    plugins:[
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};