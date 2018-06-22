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
import cookie from 'react-cookies'

//import { sessionService } from 'redux-react-session';


export const loadUserInf = (uid,callback) => {
  return (dispatch) => {

    database.loadUser(uid)
    .then( (snap) => {

      let userInf =  {}
      //console.log('snap.val()',snap.val())
      if(snap.val() !== null){
        userInf = Object.values(snap.val())[0];
        userInf.id = Object.keys(snap.val())[0];
      }
      
      //console.log('userInf',userInf);
      dispatch({
        type: actionType.LOAD_USER_INFO,
        payload: userInf
      })
      
      if(callback){
        //console.log('callback set cookie');
        callback(userInf);
      }
      

      //set localstorage
      cookie.save('__session', {userInf}, { path: '/' })


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
      console.log('__session',error)
    })

  }

  
}

export const addNewUser = (datas) => {
  return (dispatch) => {

    return new Promise((resolve,reject) =>{

      database.addUser(datas).then(resUser => {
        //console.log('resUser',resUser);
        resolve(resUser)
  
      })
      .catch(errUser =>{
        reject(errUser)
      })

    })
  }

  
}


export const updateUser = (uid,data) => {
  return (dispatch) =>{
    //return database.updateUser(uid,data)
    //console.log('uid',uid)
    return new Promise((resolve,reject) => {
      database.updateUser(uid,data)
      .then((resUp)=>{

        return resUp
      
      })
      .then((resUp)=>{
        return database.loadUser(data.authId)
       
      })
      .then( (snap) => {

        let userInf =  {}
        if(snap.val() !== null){
          userInf = Object.values(snap.val())[0];
          userInf.id = Object.keys(snap.val())[0];
        }

        dispatch({
          type: actionType.LOAD_USER_INFO,
          payload: userInf
        })
        
        //set localstorage
        cookie.save('__session', {userInf}, { path: '/' })
        
        resolve(uid)

      })
      .catch((err)=>{
        reject(err)
      })
    })
  }
}

export const ___updateUser = (uid,data) => {
  return (dispatch) =>{
    //return database.updateUser(uid,data)
    //console.log('uid',uid)
    return new Promise((resolve,reject) => {
      database.updateUser(uid,data).then((resUp)=>{

        database.loadUser(data.authId).then( (snap) => {

          let userInf =  {}
          if(snap.val() !== null){
            userInf = Object.values(snap.val())[0];
            userInf.id = Object.keys(snap.val())[0];
          }

          dispatch({
            type: actionType.LOAD_USER_INFO,
            payload: userInf
          })
          
          //set localstorage
          cookie.save('__session', {userInf}, { path: '/' })
          
          resolve(uid)

        })
        .catch(error => {
          reject(error)
        })
      
      }).catch((err)=>{
        reject(err)
      })
    })
  }
}

export const updateAddr = (uid, address) =>{
  return (dispatch) => {
    return new Promise((resolve,reject) =>{
      database.updateAddr(uid, address)
      .then(resUp => {
        console.log('updateAddr resUp',resUp);
        resolve(uid)
      })
      .catch(error =>{
        console.log('updateAddr error',error);
        reject(error)
      })
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

    cookie.remove('__session', { path: '/' })
    // sessionService.deleteSession();
    // sessionService.deleteUser();
  }
}


