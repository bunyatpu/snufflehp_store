
import actionType from '../constants'

export const addRoute = (obj) => {
  return (dispatch) => {

    dispatch({
      type: actionType.ADD_ROUTE_INFO,
      payload: obj
    })

  }
}


