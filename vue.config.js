const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // port: 8085,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~rfs': path.resolve(__dirname, 'node_modules/rfs'),
        '~primevue': path.resolve(__dirname, 'node_modules/primevue'),
        '~remixicon': path.resolve(__dirname, 'node_modules/remixicon'),
        '~scss': path.resolve(__dirname, 'src/assets/scss'),
      },
    },
  },
});
