import actionType from '../constants'
//import _ from 'lodash'

const ReqProcess =  (state = {req_product_state:0}, action) => {
  
  //let newState=  _.merge([], state)
  
  switch(action.type) {
    case actionType.ADD_PRODUCT_STATE:

      return Object.assign({},state,{req_product_state:action.payload} );

    default:
      return state
  }
}

export default ReqProcess;