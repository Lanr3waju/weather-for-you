const { merge } = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        WEATHER_API_KEY: 'JSON.stringify(process.env.WEATHER_API_KEY)',
        GEOCODE_API_KEY: 'JSON.stringify(process.env.GEOCODE_API_KEY)',
      },
    }),
  ],
  devtool: 'source-map',
});