module.exports = {
  entry: './js/index.jsx',
  output: {
    path: "./public/js/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
