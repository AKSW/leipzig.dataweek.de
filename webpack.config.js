const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: './src',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // https://webpack.js.org/plugins/mini-css-extract-plugin/
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
}
