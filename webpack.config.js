const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/pages/main/main.js',
    pets: './src/pages/pets/pets.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true,
    open: ['main.html'],
    client: {
      // Показывает ошибки при компиляции в самом браузере
      overlay: {
        // Ошибки
        errors: true,

        // Предупреждения
        warnings: false,
      },

      // Показывает прогесс компиляции
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main/main.html',
      favicon: path.resolve('./src/assets/icons/favicon.ico'),
      filename: 'main.html',
      chunks: ['common', 'main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/pets/pets.html',
      favicon: path.resolve('./src/assets/icons/favicon.ico'),
      filename: 'pets.html',
      chunks: ['common', 'pets'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devtool: 'source-map',
};
