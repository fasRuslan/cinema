const path = require('path'); //прописываем путь

module.exports = {
  entry: './src/main.js', //точка входа
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  }, // выход
  devtool: 'source-map', // карта кода
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
  }// create server
};