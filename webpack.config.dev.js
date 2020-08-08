const path = require('path');

const local = {
  sources: path.resolve(__dirname, 'src/'),
  styles: path.resolve(__dirname, 'src/styles/app.scss'),
  dist: path.resolve(__dirname, 'dist'),
  assets: path.resolve(__dirname, 'assets')
};

module.exports = {
  mode: 'development',
  context: local.sources,
  entry: './index.tsx',

  output: {
    path: local.dist,
    publicPath: '/',
    filename: 'app.js'
  },

  devtool: 'cheap-module-eval-source-map',
  target: 'web',

  devServer: {
    contentBase: 'src',
    compress: true,
    port: 4000,
    disableHostCheck: true
  },

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
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(?:png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
};
