import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

export default function configureStore(initialState = {})  {

  //console.log('initialState',initialState);
  // let middlewares = [thunk]
  // let store = createStore(reducer, applyMiddleware(...middlewares))

  // initialState.Products = [];
  // initialState.Products.push({
  //   "amount" : "3",
  //   "code" : "C01000004",
  //   "desc" : "agesag",
  //   "imgPath" : "img_products/16-38.jpg",
  //   "name" : "ทดสอบสินค้า 3",
  //   "no" : "4",
  //   "price" : "400",
  //   "product_type" : "book",
  //   "type_sale" : "order"
  // })

  const middleware = [thunk];
  const enhancers = [
    applyMiddleware(...middleware)
  ]


  const store = createStore(
    reducer
  , initialState
  , compose(...enhancers)
  )

  //store.asyncReducers = {} // Async reducer registry
  
  return store
}