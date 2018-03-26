const path = require('path');

module.exports = {
    watch: true,
    entry: {
        'dist/Feedback.js': './src/Feedback.js',
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
    }
};