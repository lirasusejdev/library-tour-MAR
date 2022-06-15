const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new WebpackAssetsManifest({
      output: "microfrontend-manifest.json",
      // Transforming manifest to include other manifest atributes.
      transform(assets, manifest) {
        const mfmanifest = require('./public/microfrontend-manifest.json');
        assets["microfrontendname"] = mfmanifest.microfrontendname;
      }
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
        }
      }
    }
  }
};
