// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
//   // ... other webpack configuration ...

//   plugins: [
//     // ... other plugins ...

//     // Add the BundleAnalyzerPlugin to the plugins array
//     new BundleAnalyzerPlugin({
//       analyzerPort: 8888,
//     }),
//   ],
// };

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};