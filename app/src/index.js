import React from 'react';
import {hydrate,render} from 'react-dom';
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import database from 'firebase-database';
import configureStore from 'config/configStore'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configFire from './firebase/firebase_key';


let allInit = window.__initialState;
let init;

if(!allInit){
  init = {}
}else{
  init  = allInit.init
}
let store = configureStore(init)
database.initializeApp(configFire.fkey)
const renderMethod = !!module.hot ? render : hydrate

renderMethod(
<Provider store={store}>
  <BrowserRouter>
    <App state={window.__initialState} />
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
