const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');

const withSourceMaps = require('@zeit/next-source-maps');
const withSass = require('@zeit/next-sass');
const WebpackBar = require('webpackbar')

const cdnHost = process.env.CDN_HOST || '';
const environmentName = process.env.ENVIRONMENT_NAME || 'development';

module.exports = withPlugins(
  [
    [withSourceMaps()],
    [
      withSass,
      {
        cssModules: true,
        // pass a list of options to the css-loader
        cssLoaderOptions: {
          localIdentName:
            environmentName === 'development' ? '[folder]-[local]-[hash:8]' : '[folder]-[hash:16]',
        },
        // pass options from node-sass
        sassLoaderOptions: {
          includePaths: [path.resolve(__dirname, '../node_modules/@deliveroo')],
        },
        // postcssLoaderOptions: {}, this is loaded via the postcss.config.js file
      },
    ],
  ],
  {
    // Expose config for both the server and client.
    publicRuntimeConfig: {
      datadogLogsClientToken: process.env.DATADOG_LOGS_CLIENT_TOKEN,
      datadogLogsEnabled: process.env.DATADOG_LOGS_ENABLED,
      environmentName,
      hopperImageTag: process.env.HOPPER_IMAGE_TAG,
      selfHelpServiceHost: process.env.SHS_API_URL,
      sentryEnabled: process.env.SENTRY_ENABLED === 'true',
      sentryDsn: process.env.SENTRY_DSN,
      withIdentity: process.env.WITH_IDENTITY,
    },
    serverRuntimeConfig: {
      selfHelpServiceHost: process.env.SHS_API_INTERNAL_URL,
    },
    onDemandEntries: {
      pagesBufferLength: 3,
    },
    assetPrefix: cdnHost,
    poweredByHeader: false,
    exportPathMap: () => ({}),
    exportTrailingSlash: true,
    webpack: (config, options) => {
      const { dev, isServer } = options;
      const buildId = options.buildId ? options.buildId : 'dev';

      config.module.rules.push({
        test: /\.(png|jpg|jpeg|svg|gif|ttf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: !isServer,
              name: '[name].[hash:8].[ext]',
              publicPath: (url) => `${cdnHost}/_next/static/${url}`,
              outputPath: 'static/',
            },
          },
        ],
      });

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ENVIRONMENT_NAME': JSON.stringify(environmentName),
          'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
          'process.env.CDN_HOST': JSON.stringify(cdnHost),
          'process.env.BUILD_ID': JSON.stringify(buildId),
        }),

        new CleanWebpackPlugin([path.join(__dirname, './dist/')], { verbose: false }),
        new WebpackBar({ fancy: true })
      );

      if (!isServer) {
        // eslint-disable-next-line no-param-reassign
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      return config;
    },
  },
);
