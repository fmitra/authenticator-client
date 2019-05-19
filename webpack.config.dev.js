const path = require('path');

const dirs = {
  sources: path.resolve(__dirname, 'src/'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
  context: dirs.sources,
  entry: './index.tsx',

  output: {
    path: dirs.dist,
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
      '@authenticator': dirs.sources
    }
  },

  module: {
    rules: [
      {
        test: /\.(?:ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
