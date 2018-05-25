import path from 'path'
import Express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
//import counterApp from './reducers'
import App from '../build/static/ssr/main'
import { renderToString } from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import firebase from 'firebase'

import { default as configureStore } from '../src/config/configStore'
import { getNewEntry } from '../src/firebase/firebase'
import {fkey} from '../src/firebase_key'
//import {init as firebaseInit} from '../src/firebase/firebase'



const app = Express()
const port = 3001

//Serve static files
//app.use('/static', Express.static('static'))
app.use('/static', Express.static(path.resolve(__dirname, '..', 'build/static')))

app.use(handleRender)

function handleRender(req, res) {


  let config = fkey;
  

  if(!firebase.apps.length){
    firebase.initializeApp(config)
  }else{
    firebase.app();
  }

  getNewEntry()
  .then( (products) => {

    let prodVal = (products === null) ? {}:products;

    const initNow = {};
    initNow.Products = prodVal;

    const store = configureStore(initNow)
    const context = {}

    const html = renderToString(
    
      <Provider store={store}>
        <StaticRouter
            location={req.url}
            context={context}
          >
            <App />
          </StaticRouter>
      </Provider>
    
    )

    const preloadedState = store.getState()
    res.send(renderFullPage(html, preloadedState))
    
  })
  .catch(error => {
    console.log('error->',error);
  })

  

}

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

app.listen(port, ()=>{
  console.log(`App listening on port ${port}!`)
})