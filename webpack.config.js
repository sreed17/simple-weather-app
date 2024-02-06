const path = require("node:path");
const Dotenv = require("dotenv-webpack");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              publicPath: "assets",
            },
          },
        ],
      },
    ],
  },
  plugins: [new Dotenv()],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    open: true,
    watchFiles: ["src/**/*.js", "src/**/*.scss", "public/**/*.html"], // Watch for changes in 'src' directory
  },
  devtool: "source-map",
};
