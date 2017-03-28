'use strict' // eslint-disable-line strict

const path = require('path')
const webpack = require('webpack')

const autoprefixer = require('autoprefixer')

const WebpackToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackToolsConfig = require('./webpack.isomorphic.tools')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Globals
const NODE_ENV = process.env.NODE_ENV || 'development'
const __DEV__ = NODE_ENV !== 'production'
const __PROD__ = NODE_ENV === 'production'
const __SERVER__ = false
const __CLIENT__ = true

let config

if (__DEV__) {
  config = {
    context: path.join(__dirname, 'src'),
    entry: {
      app: [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        './client.jsx'
      ]
    },
    resolve: {
	extensions: ['.js','.jsx','.css'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
	    query: {
            presets: ['react', ['es2015', { modules: false }], 'stage-0'],
            plugins: ['react-hot-loader/babel']
          },
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.scss$/,
	    loaders: [
		'style-loader',
		'css-loader?modules&localIdentName=[local]__[hash:base64:4]&importLoaders=1&sourceMap',
		'sass-loader?sourceMap'
            ]
        },
	{
	  test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
	},
	{
	  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
	  loader: 'url-loader?limit=100000'
	}
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
          loader:'style!css!',
          options: {
          postcss: [
            autoprefixer({
              browsers: ['last 2 versions']
            })
          ],
          context: __dirname
        }
      }),
      new ExtractTextPlugin("styles.css"),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__,
        __PROD__,
        __SERVER__,
        __CLIENT__
      }),
      new WebpackToolsPlugin(webpackToolsConfig).development(__DEV__)
    ],
    devtool: 'inline-source-map'
  }
}

if (__PROD__) {
  config = {
    context: path.join(__dirname, 'src'),
    entry: {
      app: './client.jsx'
    },
    resolve: {
	extensions: ['.js', '.jsx']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.[chunkhash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['react', ['es2015', { modules: false }], 'stage-0']
          },
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style',
            loader: [
              'css?modules&localIdentName=[hash:base64:4]&importLoaders=1&sourceMap',
              'sass?sourceMap'
            ]
          })
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          postcss: [
            autoprefixer({
              browsers: ['last 2 versions']
            })
          ],
          context: __dirname
        }
      }),
      new ExtractTextPlugin('app.[contenthash:20].css'),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__,
        __PROD__,
        __SERVER__,
        __CLIENT__
      }),
      new WebpackToolsPlugin(webpackToolsConfig).development(__DEV__)
    ],
    devtool: 'source-map'
  }
}

module.exports = config
