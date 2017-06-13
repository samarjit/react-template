var webpack = require('webpack');

var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  entry: [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  APP_DIR + '/index'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    // // enable HMR on the server

    // contentBase: path.resolve(__dirname, 'dist'),
    // // match the output path

    // publicPath: '/'
    // // match the output `publicPath`
    proxy:{
      "/rest": {
        target: "http://localhost:9000/"    
      }
    }
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loader : 'babel-loader',
        // query: {
        //   options: { 
        //     // presets: ['react',  ["latest", {"es2015": {"modules": false}}] ],
        //     // plugins:["react-hot-loader/babel"]
        //   }
        // }
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = config;