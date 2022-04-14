/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
// const withCss = require('@zeit/next-css');
// const withLess = require('@zeit/next-less');
const withAntdLess = require('next-plugin-antd-less');
const withLess = require('next-with-less');
const path = require('path');
if (typeof require !== 'undefined') {
  // eslint-disable-next-line
  //console.log("require",require);
  require.extensions[('.css', '.less')] = (file) => { };
}
console.log("---------------next.config.js-------------process.env.NODE_ENV", process.env.NODE_ENV);
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
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
    [withLess],
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
