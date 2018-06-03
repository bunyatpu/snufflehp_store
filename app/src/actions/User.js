// import { 
//   getProductDB,
//   saveProductDB,
//   delProductDB,
//   uploadImage,
//   getNewEntry ,
//   getProductPromote
// } from '../firebase/firebase'
import database from '../firebase/user';
import actionType from '../constants'

//import { sessionService } from 'redux-react-session';

export const loadUserInf = (uid,callback) => {
  return (dispatch) => {

    database.loadUser(uid)
    .then( (snap) => {

      let userInf = (snap.val() === null) ? {}:Object.values(snap.val())[0];
      //console.log('userInf',Object.entries(snap.val()))

      dispatch({
        type: actionType.LOAD_USER_INFO,
        payload: userInf
      })
      
      if(callback){
        console.log('callback set cookie');
        callback(userInf);
      }
      

      //set localstorage
      //localStorage.setItem('userInfo', JSON.stringify(userInf));
      //--
      // sessionService.saveSession({ token:'1235456' })
      // .then(() => {
      //   sessionService.saveUser(userInf)
      // });
      // console.log('save cookie');
      // Cookies.set('userInf', userInf, { path: '/' })
      
    })
    .catch(error => {
      console.log('error',error)
    })

  }

  
}



export const setUserInf = (userInfo) => {
  return (dispatch) => {

    dispatch({
      type: actionType.LOAD_USER_INFO,
      payload: userInfo
    })
  }
}

export const logOut = (callback) => {
  return (dispatch) => {

    dispatch({
      type: actionType.LOAD_USER_INFO,
      payload: {}
    })

    if(callback){
      callback()
    }
    // sessionService.deleteSession();
    // sessionService.deleteUser();
  }
}


