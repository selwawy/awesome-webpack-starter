const path = require('path');
const IS_BUILD = process.env.npm_lifecycle_event;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
   mode: 'development',
   entry: {
      bundle: path.resolve(__dirname, 'src/index.js'),
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name][contenthash].js',
      clean: true,
      assetModuleFilename: (pathData) => {
         const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
         return `${filepath}/[name][contenthash].[ext][query]`;
      },
   },
   devtool: 'eval',
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist'),
      },
      port: 8080,
      open: false,
      hot: true,
      compress: true,
      historyApiFallback: true,
   },
   module: {
      rules: [
         {
            test: /\.(sc|sa|c)ss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
               },
            },
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|vtt|mp4)$/i,
            type: 'asset/resource',
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'LVP',
         template: 'src/template.html',
      }),
      // new BundleAnalyzerPlugin(),
   ],
};

if (IS_BUILD == 'build') {
   config.mode = 'production';
   config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
   config.plugins.push(new MiniCssExtractPlugin({ filename: 'css/styles.[contenthash].css' }));
}

module.exports = config;
