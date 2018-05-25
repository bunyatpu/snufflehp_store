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

const functions = require('firebase-functions');
const firebase = require('firebase');
const express = require('express');
const app = require('express')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fireConfig = require('./firebase_key');

// React App
const ServerApp = React.createFactory(require('./build/server.bundle.js').default);

const database = require('./firebase-db');

const keys = fireConfig.fkey;
database.initializeApp(keys);
//local
app.use(express.static('../public'));



app.get('*', (req, res) => {


  database.getNewEntry().then(function(products){

    var prodVal = (products === null) ? {}:products;

    const init =  {
      "Products":prodVal
    }

    const html = ReactDOMServer.renderToString(ServerApp({init: init,req:req, context: {},fireConf:keys}));
  
    res.send(renderFullPage(html,{}))

  });

  
  //res.send('1000')
});

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link href="/static/css/main.9b29228e.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        
      </body>
    </html>
    `
}

exports.snuff_app = functions.https.onRequest(app);

// app.listen(4000, (err) => {
//   if (err) throw err
//   console.log('> Ready on http://localhost:4000')
// })
