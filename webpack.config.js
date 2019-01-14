var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
    watch: true,
    entry: {
        'dist/feedback.js': './src/Feedback.js',
        'dist/feedback.min.js': './src/Feedback.js',
        'test/dist/unit.js': './test/unit/unit.js',
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: '[name]',
        library: 'Feedback',
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [ './src', './test/unit' ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};