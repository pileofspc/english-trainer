const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');

let newOptions = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            // from
            directory: global.PATHS.static,
            // to
            publicPath: '/static',
        },
        port: 3000,
        hot: true,
        compress: true,
        watchFiles: ['src/**/*.html'],
        historyApiFallback: true
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 // require('autoprefixer')
                    //             ],
                    //         },
                            
                    //     }
                    // },
                    // 'resolve-url-loader',
                    'sass-loader',
                ],
            },
        ]
    },
}

exports = module.exports = merge(base, newOptions);