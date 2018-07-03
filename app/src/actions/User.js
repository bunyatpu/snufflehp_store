// import { 
//   getProductDB,
//   saveProductDB,
//   delProductDB,
//   uploadImage,
//   getNewEntry ,
//   getProductPromote
// } from '../firebase/firebase'
import database from '../firebase/user';
import auth from '../firebase/auth';
import actionType from '../constants'
import cookie from 'react-cookies'

//import { sessionService } from 'redux-react-session';

export const loadUserInf =  (authId,callback) => {
  //console.log('User->loadUserInf',uid)
  return (dispatch) =>{
    return Promise.resolve().then(()=>{
      return new Promise((resolve,reject)=>{
       
        database.loadUser(authId).then( (snap) => {
  
          let userInf =  {}
          //console.log('snap.val()',snap.val())
          if(snap.val() !== null){
            userInf = Object.values(snap.val())[0];
            userInf.id = Object.keys(snap.val())[0];
          }
          //console.log('User->loadUser',userInf)
          resolve(userInf)
  
        }).catch(error => {
          //console.log('__session',error)
          reject(error)
        })
  
      })
    }).then((userInf)=>{
      return new Promise((resolve,reject)=>{
        auth.currentUser().then((authInfo)=>{
          
          userInf.authInfo = authInfo
          //console.log('-->currentUser userInf',userInf)
          dispatch({
            type: actionType.LOAD_USER_INFO,
            payload: userInf
          })
          
          if(callback){
            callback(userInf);
          }
          
          //set localstorage
          //console.log('currentUser',userInf);

          cookie.save('__session', {userInf}, { path: '/' })


          resolve(userInf)
        }).catch((error)=>{

          //console.log('error currentUser',error);
          reject(error)
        })
      })
    })
  }

}


export const _loadUserInf = (uid,callback) => {
  return (dispatch) => {

    return new Promise((resolve,reject)=>{

      database.loadUser(uid).then( (snap) => {

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
          callback(userInf);
        }
        
        //set localstorage
        cookie.save('__session', {userInf}, { path: '/' })

        resolve(snap.val())

      }).catch(error => {
        console.log('__session',error)
        reject(error)
      })

    })
    

  }

}

export const addNewUser = (datas) => {
  return (dispatch) => {

    return new Promise((resolve,reject) =>{

      database.addUser(datas).then(resUser => {
        //console.log('resUser',resUser);
        resolve(datas)
  
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
    //console.log('User->updateUser',uid)
    return Promise.resolve().then(()=>{
      return new Promise((resove,reject)=>{
        //console.log('User->updateUser',uid)
        database.updateUser(uid,data).then(resUp=>{
          resove(resUp)
        }).catch(err=>{
          reject(err)
        })
      })
    }).then((res)=>{
      return loadUserInf(data.authId)(dispatch)
    })

    
  }
}

export const __updateUser = (uid,data) => {
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
        //console.log('updateAddr resUp',resUp);
        resolve(uid)
      })
      .catch(error =>{
        //console.log('updateAddr error',error);
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

export const updatePassword = (newPassword) => {
  return database.updatePassword(newPassword)
}


