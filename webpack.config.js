const path = require('path');

module.exports = {
  entry: './js/drawtree.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
};
