/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var axis = require('axis');
var rupture = require('rupture');
var ReactStaticPlugin = require('react-static-webpack-plugin');


var locale = process.env.LOCALE;

console.log("Building for locale:", locale);

if (!locale) {
  throw new Error("Locale not provided as an environment variable. i.e.,  'LOCALE=en'.");
}


module.exports = {
  devtool: 'source-map',

  entry: {
    app: ['isomorphic-fetch', './client/index.js'],
  },

  output: {
    path: path.join(__dirname, 'public', locale),
    filename: '[name].js',
    publicPath: '/',
  },
  
  externals: {
    'shopify-buy': 'ShopifyBuy'
  },
  
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      compressor: { warnings: false },
    }),
    new ReactStaticPlugin({
      routes: './client/routes.js',
      template: './template.js',
    }),
    new webpack.ProvidePlugin({
        'Promise': 'bluebird',
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,

    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.join(__dirname, 'node_modules'),
        plugins: [
          [ "transform-format-message", {
              "generateId": "underscored_crc32",
              "inline": true,
              "locale": locale
            } 
          ]
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!stylus'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['url?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loaders: ['file?name=[name].[ext]'],
      },
    ],
  },

  stylus: {
    use: [axis(), rupture()],
  }
};
