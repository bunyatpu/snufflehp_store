import actionType from '../constants'
import _ from 'lodash'

const Products =  (state = [], action) => {
  
  let newState=  _.merge([], state)
  
  switch(action.type) {
    case actionType.LOAD_PRODUCT_SUCCESS:

      newState = action.payload

      return newState

    case actionType.LOAD_PRODUCT_FAILED:
    
      return action.payload

    case actionType.ADD_PRODUCT_SUCCESS:

      return _.merge(newState, [action.payload])
   
    case actionType.DETETE_PRODUCT:

      //return newState.filter(model => model.key !== action.payload )
      return _.omit(newState, [action.payload])
    case actionType.LOAD_PRODUCT_PROMOTE:

      let nState = Object.assign([],state)
      nState.push(action.payload)
      
      return  nState

    case actionType.LOAD_NEW_ENTRY:
      //console.log('===>REDUCER LOAD_NEW_ENTRY',action.payload);
      
      return Object.assign([],state,action.payload)
    default:
      return state
  }
}

export default Products;