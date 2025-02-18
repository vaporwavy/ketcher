const {
  override,
  addBundleVisualizer,
  addWebpackModuleRule,
  addWebpackPlugin
} = require('customize-cra')
const webpack = require('webpack')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const gitRevisionPlugin = new GitRevisionPlugin({ lightweightTags: true })

module.exports = override(
  addBundleVisualizer({}, true),
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: 'pre',
    loader: 'source-map-loader',
    exclude: /node_modules/
  }),
  addWebpackPlugin(
    new webpack.EnvironmentPlugin({
      MODE: process.env.MODE
    })
  ),
  addWebpackPlugin(
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@version',
        replacement: gitRevisionPlugin.version()
      }
    ])
  )
)
