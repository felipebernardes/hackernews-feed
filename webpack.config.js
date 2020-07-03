const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  devtool: 'inline-source-map',  
  output: {
    filename: 'main.js',
    path: __dirname
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, '/.'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};