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
    './src/index.tsx'
  ]),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [ '.ts', '.tsx', '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          'source-map-loader'
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

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   React: 'React',
  //   ReactDOM: 'ReactDOM'
  // },

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
