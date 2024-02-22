/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
// const withCss = require('@zeit/next-css');
// const withLess = require('@zeit/next-less');
const withAntdLess = require('next-plugin-antd-less');
const withLess = require('next-with-less');
const path = require('path');
if (typeof require !== 'undefined') {
  require.extensions[('.css', '.less')] = (file) => { };
}
console.log(
  '---------------next.config.js-------------process.env.NEXT_API_URL',
  process.env.NEXT_API_URL
);
console.log(
  '---------------next.config.js-------------process.env.NODE_ENV',
  process.env.NODE_ENV
);
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // 配置环境变量--浏览器环境使用
  env: {
    NEXT_API_ENV: process.env.NEXT_API_ENV,
    NEXT_API_URL: process.env.NEXT_API_URL,
  },
  webpack: (config, { dev, isServer }) => {
    // config.plugins.push(
    //   new webpack.DefinePlugin({
    //     'process.env.NEXT_API_URL': JSON.stringify(process.env.NEXT_API_URL),
    //   })
    // );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// module.exports = withLess(
//   {
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//       importLoaders: 1,
//       localIdentName: "[local]___[hash:base64:5]",

//     },
//     distDir: 'build'
//   }
// )
module.exports = withPlugins(
  [
    [withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      }
    ],
    [
      withAntdLess,
      {
        cssModules: true,
        localIdentName: '[name]__[local]_[hash:base64:5]',
      },
    ],
    // [
    //   withAntd,
    //   {
    //     cssModules: true,
    //     cssLoaderOptions: {

    //       sourceMap: false,
    //       importLoaders: 1,
    //     },
    //     lessLoaderOptions: {
    //       javascriptEnabled: true,
    //       modifyVars: antdVariables,
    //     },
    //   },
    // ],
  ],
  nextConfig
);
