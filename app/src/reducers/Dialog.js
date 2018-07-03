import actionType from '../constants'
//import _ from 'lodash'

const init = {
  signIn:{
    isOpen:false
  },
  signUp:{
    isOpen:false,
    showAddr:false
  },
  changeEmail:{
    isOpen:false,
    showAddr:false
  }
}

const Dialog =  (state = init, action) => {
  
  switch(action.type) {
    case actionType.SIGNIN_DIALOG_SET_TOGGLE:

      return Object.assign({},init,{
        signIn:{
          isOpen:action.payload
        }
      });

    case actionType.SIGNUP_DIALOG_SET_TOGGLE:

      return Object.assign({},init,{
        signUp:{
          isOpen:action.payload
        }
      });

    case actionType.SIGNUP_DIALOG_SHOW_ADDR:

      return Object.assign({},init,{
        signUp:{
          isOpen:state.signUp.isOpen,
          showAddr:action.payload
        }
      });
    case actionType.CHANGEEMAIL_DIALOG_SET_TOGGLE:

      return Object.assign({},init,{
        changeEmail:{
          isOpen:action.payload
        }
      });

    default:
      return state
  }
}

export default Dialog;