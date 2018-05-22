
const path = require('path')
const webpack = require('webpack');
module.exports = {
  // Which file is the entry point to the application
  entry: {
     app:   './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './dist'
   },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: '[name].bundle.js',    
    path: path.resolve(__dirname,'dist'),
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
  
}

// https://github.com/mschwarzmueller/reactjs-css-animation-basics/blob/01-css-transitions/src/index.html