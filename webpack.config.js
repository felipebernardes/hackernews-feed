const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: ['./src/js/main.js', './src/scss/main.scss'],
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: __dirname
  },
  watch: false,
  devServer: {
    compress: true,
    inline: true,
    contentBase: './',
    port: 9000
  },
  plugins: [
    new MinifyPlugin(null, {
      comments: false
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
};