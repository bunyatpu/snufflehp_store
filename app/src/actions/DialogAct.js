
import actionType from '../constants'

export const setSignInOpen = (set) => {
  return (dispatch) => {

    dispatch({
      type: actionType.SIGNIN_DIALOG_SET_TOGGLE,
      payload: set
    })

  }
}

export const setSignUpOpen = (set) => {
  return (dispatch) => {
    const typeSet = typeof set;
    //console.log('typeSet',typeSet)

    if(typeSet === "boolean"){
      dispatch({
        type: actionType.SIGNUP_DIALOG_SET_TOGGLE,
        payload: set
      })

    }else{

      dispatch({
        type: actionType.SIGNUP_DIALOG_SET_TOGGLE,
        payload: set.isOpen
      })
      dispatch({
        type: actionType.SIGNUP_DIALOG_SHOW_ADDR,
        payload: set.showAddr
      })

    }
   

  }
}


