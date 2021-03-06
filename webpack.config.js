var path = require("path");
var Html = require('html-webpack-plugin');
var MiniCSS = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = function (env) {
    const isDev = env && env.dev ? true : false;
    console.log(isDev, 'isDev');

    const config = {
        entry: "./src/main.jsx",
        output: {
            filename: "out.js",
            path: path.resolve(__dirname, "docs")
        },
        mode: isDev ? 'development' : 'production',
        module: {
            rules: [
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCSS.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        isDev ? 'style-loader' : MiniCSS.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    new require('autoprefixer')({
                                        browsers: [
                                            'ie 11' // tu definiujemy wsparcie dla przegladarek w css
                                        ]
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(jpg|jpeg|gif|png|csv)$/,
                    use: {
                        loader: 'file-loader?outputPath=images/',
                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true
                        }
                    }
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'fonts',
                            outputPath: 'fonts'
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
            // alias: {
            //     'react-sound': __dirname + './src'
            // }
        },
        plugins: [
            new Html({
                filename: 'index.html',
                template: './src/index.html'
            }),
            new MiniCSS({
                filename: "app.css", // definiujemy adres pliku css
            }),
            new CopyWebpackPlugin([
                {from: './src/images', to: 'images'},
            ])

        ]
    }

    return config;
}