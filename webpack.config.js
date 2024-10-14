const path = require('path');

module.exports = {
  entry: './dev/js/app.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, './assets/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};