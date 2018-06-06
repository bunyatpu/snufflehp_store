import actionType from '../constants'
//import _ from 'lodash'

const RouteInfo =  (state = {}, action) => {
  
  //let newState=  _.merge([], state)
  
  switch(action.type) {
    case actionType.ADD_ROUTE_INFO:

      return Object.assign({},action.payload);

    default:
      return state
  }
}

export default RouteInfo;