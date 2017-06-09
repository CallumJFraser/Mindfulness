module.exports = {
    context: __dirname,
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/build',
        filename: 'index.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest'],
                    plugins: ['add-module-exports'],
                },
            },
        ],
    },
    externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
};
