// Instantiate a variable for our file path
var path = require('path');
// Set a constant for required module 'webpack'
const webpack = require('webpack');
//  Procedure 
module.exports  = {
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
//  watch: true,
  module:{
    loaders: [
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
}
