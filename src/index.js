import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {init as firebaseInit} from './firebase/firebase'
import configureStore from 'config/configStore'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebaseInit()
console.log('call root index');

const init = {
  "Products":[
    {
      "amount" : "3",
      "code" : "C01000004",
      "desc" : "agesag",
      "imgPath" : "img_products/16-38.jpg",
      "name" : "ทดสอบสินค้า 3",
      "no" : "4",
      "price" : "400",
      "product_type" : "book",
      "type_sale" : "order"
    }
  ]
}
let store = configureStore(init)

hydrate(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
