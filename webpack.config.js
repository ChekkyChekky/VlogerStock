var path = require('path');
 
module.exports = {
  entry: './src/index.js',
  output: { path: __dirname, filename: 'bundle.js', publicPath: "/assets/"},
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {"presets": ["react"]}
      },
      { 
          test: /\.js$/, 
          loader: 'babel-loader', 
          exclude: /node_modules/,
          query: {"presets": ["react"]}
        }
    ]
  },
  devServer: {
    inline:true,
    port: 8080
  },
};

