import {combineReducers} from 'redux'
import { sessionReducer } from 'redux-react-session';
//export default products
import Products from './Products'
import ReqProcess from './ReqProcess'
import User from './User'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  Products,
  ReqProcess,
  User,
  form: formReducer,
  session: sessionReducer
})

export default reducer