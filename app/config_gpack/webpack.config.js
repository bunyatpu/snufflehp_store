/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Sample Webpack Configuration
const path = require('path');
const paths = require('../config/paths');
const fs = require('fs');
const url = require('url');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].[contenthash:8].css';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const autoprefixer = require('autoprefixer');
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'firebase-database': path.resolve(__dirname, '../../functions/firebase-db'),
    },
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, "../node_modules")],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      // "oneOf" will traverse all following loaders until one will
      // match the requirements. When no loader matches it will fall
      // back to the "file" loader at the end of the loader list.
      oneOf: [
        // "url" loader works just like "file" loader but it also embeds
        // assets smaller than specified size as data URLs to avoid requests.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        // Process JS with Babel.
        {
          test: /\.(js|jsx|mjs)$/,
          include: resolveApp('src'),
          loader: require.resolve('babel-loader'),
          options: {
            
            compact: true,
          },
        },
        // The notation here is somewhat confusing.
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader normally turns CSS into JS modules injecting <style>,
        // but unlike in development configuration, we do something different.
        // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
        // (second argument), then grabs the result CSS and puts it into a
        // separate file in our build process. This way we actually ship
        // a single CSS file in production instead of JS code injecting <style>
        // tags. If you use code splitting, however, any async bundles will still
        // use the "style" loader inside the async code so CSS from them won't be
        // in the main CSS file.
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            Object.assign(
              {
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: false,
                  },
                },
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: shouldUseSourceMap,
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      // Necessary for external CSS imports to work
                      // https://github.com/facebookincubator/create-react-app/issues/2677
                      ident: 'postcss',
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                        }),
                      ],
                    },
                  },
                ],
              },
              extractTextPluginOptions
            )
          ),
          // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
        },
        // "file" loader makes sure assets end up in the `build` folder.
        // When you `import` an asset, you get its filename.
        // This loader doesn't use a "test" so it will catch all modules
        // that fall through the other loaders.
        {
          loader: require.resolve('file-loader'),
          // Exclude `js` files to keep "css" loader working as it injects
          // it's runtime that would otherwise processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.js$/, /\.html$/, /\.json$/],
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      ],
    }
  ]
  },
  plugins:[
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ]
};
