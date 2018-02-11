const path = require('path');

module.exports = {
  entry: "./init.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "./public/"
  },
  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  }
}
