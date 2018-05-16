import {combineReducers} from 'redux'

//export default products
import Products from './Products'
import ReqProcess from './ReqProcess'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  Products,
  ReqProcess,
  form: formReducer
})

export default reducer