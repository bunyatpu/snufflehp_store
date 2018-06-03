import React from 'react';
import {hydrate,render} from 'react-dom';
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import database from 'firebase-database';
import configureStore from 'config/configStore'
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import configFire from './firebase/firebase_key';
//import { sessionService } from 'redux-react-session';
import { CookiesProvider } from 'react-cookie';


let allInit = window.__initialState;
let init;

if(!allInit){
  init = {}
}else{
  init  = allInit.init
}

let store = configureStore(init)
//sessionService.initSessionService(store, { driver: 'COOKIES' });
database.initializeApp(configFire.fkey)
const renderMethod = !!module.hot ? render : hydrate

//const wrapCookie = withCookies(<App state={window.__initialState} callFrom="client" />);


renderMethod(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App state={window.__initialState} callFrom="client" />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
, document.getElementById('root'));
// registerServiceWorker();
