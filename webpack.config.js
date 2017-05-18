const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const productionEnv = process.env.NODE_ENV === 'production';
const developmentEnv = !productionEnv;

let plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    inject: 'body',
    filename: 'index.html'
  })
];

let entries = [
  'babel-polyfill'
  // Babel-polyfill will emulate a full ES2015 environment. Necessary for IE.
];

if (developmentEnv) {
  const WebpackNotifierPlugin = require('webpack-notifier');
  plugins = plugins.concat([
    new WebpackNotifierPlugin({ alwaysNotify: true, title: 'Marvel Super Heroes App' }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ]);

  entries = entries.concat([
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server'
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
  ]);
}

let config = {
  devtool: productionEnv ? 'cheap-source-map' : 'eval',
  entry: entries.concat([
    './src/index.js'
  ]),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        /**
         * css-loader makes any urls within the project part of our dependency graph
         * and the style-loader puts a style tag for the CSS in our HTML.
         */
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'img-[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};

if (developmentEnv) {
  Object.assign(config, {
    devServer: {
      public: 'localhost:8080',
      hot: true,
      inline: true
    }
  });
}

module.exports = config;
