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

  const init =  {
    "Products":[{
      "amount" : "3",
      "code" : "C01000004",
      "desc" : "agesag",
      "imgPath" : "img_products/16-38.jpg",
      "name" : "ทดสอบสินค้า 3",
      "no" : "4",
      "price" : "400",
      "product_type" : "book",
      "type_sale" : "order",
      "imgDownloadPath":"https://firebasestorage.googleapis.com/v0/b/snufflehp-v3.appspot.com/o/img_products%2F16-38.jpg?alt=media&token=3f9f5383-ceb2-4498-8a41-8b206d9ec08e"
    },
    {
      "amount" : "5",
      "code" : "C01000005",
      "desc" : "sageseg",
      "imgPath" : "img_products/9-64.jpg",
      "name" : "ทดสอบ 4",
      "no" : "5",
      "price" : "300",
      "product_type" : "book",
      "type_sale" : "order",
      "imgDownloadPath":"https://firebasestorage.googleapis.com/v0/b/snufflehp-v3.appspot.com/o/img_products%2F3-141.jpg?alt=media&token=b24a75fd-405f-40d9-b2bb-a116931117a4"
    }
  ]}
  
  
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