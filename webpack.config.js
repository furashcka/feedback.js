const path = require('path');

module.exports = {
    watch: true,
    entry: './src/Feedback.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Feedback.js',
        library: 'Feedback',
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [ './src' ]
    }
};