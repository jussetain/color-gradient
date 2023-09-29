const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: {
      type: "window",
    },
  },
};

module.exports = config
