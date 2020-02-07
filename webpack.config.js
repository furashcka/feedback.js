var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
    watch: true,
    //devtool: 'source-map',
    entry: {
        'dist/feedback.js': './src/Feedback.js',
        'dist/feedback.min.js': './src/Feedback.js',
        'test/dist/app.js': './test/unit/app.js',
    },
    output: {
        path: path.resolve( __dirname, '' ),
        filename: '[name]',
        library: 'Feedback',
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [ './src', './test/unit' ],
        alias: {
            'node_modules': path.join( __dirname, 'node_modules' )
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.js$/,
            beautify: true,
            mangle : false,
            compress : false
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new webpack.BannerPlugin([
            'license: MIT',
            'https://furashcka.github.io/feedback.js/docs/'
        ].join( '\n' ))
    ]
};