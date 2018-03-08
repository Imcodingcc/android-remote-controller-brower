var path = require('path');
module.exports = {
  devtool: "source-map",
  entry: "./src/js/main.js",//入口文件
  output: {//打包输出的文件
    path: __dirname,
    filename: "dist/bundle.js"
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'es6'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', "stage-0", "stage-1"]
        }
      }
    ]
  },
}