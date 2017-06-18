var path = require('path');

module.exports = {
  entry: './js/drawtree.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist")
  }
}