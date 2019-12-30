const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const HappyPack = require('happypack');
const os = require('os');
const theme = require('../theme');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../src/page/index.tsx'),
  output: {
    path: path.join(__dirname, '../dev/'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css',
      },
      {
        test: /\.less$/,
        use: 'happypack/loader?id=less',
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    useLocalIp: true,
    port: 3001,
    open: true,
    hot: true,
    compress: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, '../dev/'),
    historyApiFallback: true, // 所有的404都连接到index.ejs
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HappyPack({
      id: 'css',
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
      ],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'less',
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            modifyVars: theme,
          },
        },
      ],
      threadPool: happyThreadPool,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
    }),
  ],
};

module.exports = merge(baseConfig, devConfig);
