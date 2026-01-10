const path = require("path");

module.exports = {
  entry: "./src/content.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "content.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,        // TypeScript対応
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]  // TypeScript追加
  },
  mode: "production",
  devtool: false
};
