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
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const express = require('express');
const app = require('express')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fireConfig = require('./firebase_key');
const template = require('./html-template');
const admin = require('firebase-admin');
global.admin = admin;
// const cookiesMiddleware = require('universal-cookie-express');
// React App
const ServerApp = React.createFactory(require('./build/server.bundle.js').default);

const database = require('./firebase-db');

const keys = fireConfig.fkey;
//database.initializeApp(keys);
var defaultApp = admin.initializeApp(functions.config().firebase);
console.log('defaultApp==>',defaultApp.name);
//local
app.use(express.static('../public'));
app.use(cors);
app.use(cookieParser);
// app.use(cookiesMiddleware())

// app.get("/service-worker.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
// });

// app.get('/favicon.ico', function(req, res) {
//   res.send(204);
// });

// global.firebase = firebase;

// global.testNameb = '4444';

app.get('*', (req, res) => {

  //console.log('server show cookies',req.cookies);
  //console.log('global',global.firebase)

  console.log('route ssr start')

  database.getNewEntry().then(function(products){

    var prodVal = (products === null) ? {}:products;

    const init =  {
      "Products":prodVal
    }

    const objCookies = (req.cookies && req.cookies.__session !== undefined) ? JSON.parse(req.cookies.__session):{};

    const html = ReactDOMServer.renderToString(
      ServerApp({init: init,req:req, context: {},fireConf:keys,cookies:objCookies})
    );
    
  
    res.send(template(html,{init:init}))

    //res.send('<h2>show cookies</h2><br>'+JSON.stringify(req.cookies)+'')

  });

  //res.send('1000')
});

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link href="/static/css/main.d9914f3e.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__initialState = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src='/static/js/main.df8ee9a0.js'></script>
        
      </body>
    </html>
    `
}

exports.snuff_app = functions.https.onRequest(app);

// app.listen(4000, (err) => {
//   if (err) throw err
//   console.log('> Ready on http://localhost:4000')
// })
