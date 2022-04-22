const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // Map to origin code to fix bug
  devtool: "source-map",
  entry: "./src/index.tsx",
  target: "web",
  mode: "development",
  output: {
    // Folder export build
    path: path.resolve(__dirname, "build"),
    // Bundle file export
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(js, jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  plugins: [
    // Create bundle.js embed in index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    compress: true,
    // Make sure the Router work
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
};
