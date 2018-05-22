const HtmlWebPackPlugin = require('html-webpack-plugin')
/**
 * This plugin should be used only on production builds
 * without style-loader in the loaders chain.
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, argv) => {
  const DEV = argv.mode === 'development'

  return {
    optimization: {
      minimizer: [
        // Because optimization is provided (for css minification),
        // it's overriding webpack default optimization
        // So need to specify minification for JS
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        // Necessary because there's no built-in css minification in Webpack 4
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              // Error about postcss.config missing without this line
              options: { plugins: () => [require('autoprefixer')] }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: DEV ? '[name].css' : '[name].[hash].css',
        chunkFilename: DEV ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
