import {combineReducers} from 'redux'
import { sessionReducer } from 'redux-react-session';
//export default products
import Products from './Products'
import ReqProcess from './ReqProcess'
import User from './User'
import RouteInfo from './RouteInfo'
import ProductDetail from './ProductDetail'
import Dialog from './Dialog'
import Carts from "./Carts";
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  Products,
  ReqProcess,
  User,
  RouteInfo,
  ProductDetail,
  Dialog,
  Carts,
  form: formReducer,
  session: sessionReducer
})

export default reducer