const path = require('path');

module.exports = {
  // Your other webpack configurations...

  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      zlib: require.resolve('browserify-zlib'),
    },
  },

  // The rest of your webpack configuration...
};
