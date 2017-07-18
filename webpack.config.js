var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require("path")

module.exports = {
  entry: [
    __dirname + "/src/app.js",
      __dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css",
      __dirname + "/src/app.css"
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/",
  },
  devtool: "source-map",
  module: {
    rules: [
        {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['stage-2', 'es2015']
            }
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },
    ],
  },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    },
  plugins:[
      new HtmlWebpackPlugin({
          template: './src/index.html',
          hash:true,
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
          }
      }),
      new HtmlWebpackPlugin({
          filename: './src/balance.html',
          template: './src/balance.html',
          hash:true,
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
          }
      }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    host: "localhost",
    inline: true
  }
};