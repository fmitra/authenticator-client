const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const local = {
  sources: path.resolve(__dirname, 'src/'),
  styles: path.resolve(__dirname, 'src/styles/app.scss'),
  dist: path.resolve(__dirname, 'dist'),
  assets: path.resolve(__dirname, 'assets')
};

module.exports = {
  mode: 'production',
  context: local.sources,
  entry: {
    app: './index.tsx',
    vendor: [
      'history',
      'preact',
      'preact-context',
      'preact-redux',
      'preact-router',
      'preact-router-redux',
      'qrious',
      'redux',
      'redux-thunk',
    ]
  },

  output: {
    path: local.dist,
    publicPath: '',
    filename: '[name]-[chunkhash].js',
    sourceMapFilename: '[file].map'
  },

  target: 'web',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@authenticator': local.sources,
      '@styles': local.styles,
      'assets': local.assets
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(?:ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              options: {
                plugins: () => [require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                })]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.(?:png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/images/[name]-[hash].[ext]'
        }
      }
    ]
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCSSExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id].css'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new HtmlWebpackPlugin({
      template: 'index.ejs'
    })
  ]
};
