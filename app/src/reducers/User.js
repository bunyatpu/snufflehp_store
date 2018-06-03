import actionType from '../constants'
//import _ from 'lodash'

const User =  (state = {}, action) => {
  
  //let newState=  _.merge([], state)
  
  switch(action.type) {
    case actionType.LOAD_USER_INFO:

      return Object.assign({},action.payload);

    default:
      return state
  }
}

export default User;