const path = require('path');
const webpack = require('webpack')

const OUTPUT_PATH =  path.join(__dirname, '../server/dist')

module.exports = {
  entry: {
    bundle:"./index.js",
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: "/dist/",
    filename: "[name].js"
  },
  module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader" // creates style nodes from JS strings
            },
            {
              loader: "css-loader" // translates CSS into CommonJS
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?sourceMap'
        }, {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        }
      ] 
  }
};
