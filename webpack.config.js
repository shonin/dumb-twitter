const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
        './dumb_twitter/static/sass/project.scss',
        './dumb_twitter/static/js/project.js'
    ],
    output: {
        path: __dirname + "/dumb_twitter/static/dist",
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    watchOptions: {
        ignored: [
            /node_modules/,
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        // new BrowserSyncPlugin({
        //
        //     files: [
        //         'index.html',
        //         'assets/**/*.css'
        //     ],
        //     host: 'localhost',
        //     port: 3000,
        //     server: {
        //         baseDir: ['.']
        //     }
        // })
    ]
};
