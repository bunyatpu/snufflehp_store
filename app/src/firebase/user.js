const firebase = global.admin || require('firebase');
//const auth = require('./auth')
const cookie  = require('react-cookies')
const actionType = require('../constants').default

const addUser = (data) => {

  let model = {
    userName:data.userName,
    email:data.email,
    authId:data.authId,
    tel:"",
    address:(data.address !== undefined)?data.address:{}
  }
  var fbRef = firebase.database().ref('users')
  return fbRef.push(model);

}

const updateUser = (uid,data) =>{
  //console.log('updateUser uid',uid,data)
  var fbRef = firebase.database().ref('users').child(uid)

  return fbRef.update({
    userName:data.userName,
    tel:data.tel
  })
}

const updateUserEmail = (authId,newEmail) => {
  // let fbRef = firebase.database().ref('users').child(uid)
  // return fbRef.update({email:newEmail})

  var fbRef = firebase.database().ref('users')
  return Promise.resolve().then(()=>{
    return fbRef.orderByChild("authId").equalTo(authId).once('value')
  }).then((snap)=>{

    //let userInf =  {}
    //Object.keys(snap.val())[0];
    return firebase.database().ref('users').child(Object.keys(snap.val())[0]).update({email:newEmail})
  })
}

const updateAddr = (uid,address) => {

  //console.log('updateAddr',uid,address)
  var fbRef = firebase.database().ref('users').child(uid)
  //var resUp = fbRef.update({address});
  //console.log('--->',resUp)
  return fbRef.update({address})

}

const loadUser = (authId) =>{
  //console.log('userId',userId);
  var fbRef = firebase.database().ref('users')
  //return fbRef.on('value')
  //return fbRef.orderByChild("authId").equalTo(authId).on('value')


  return new Promise((resolve,reject)=>{
    fbRef.orderByChild("authId").equalTo(authId).on('value',function(snap){
      console.log('===>user change<===');
      resolve(snap)
    })
  })
}

const fbLoadUserListener =  (authId,dispatch) => {
  console.log('fbLoadUserListener',authId,firebase)


  var dbUser = firebase.database().ref('users');
  dbUser.orderByChild("authId")
  .equalTo(authId)
  .on('value',function(snap){
    console.log('===>user change<===');
    // console.log('==>',snap.val());
    //console.log('dispatch',dispatch);

    //console.log('actionType',actionType)

    let userInf =  {}
    //console.log('snap.val()',snap.val())
    if(snap.val() !== null){
      userInf = Object.values(snap.val())[0];
      userInf.id = Object.keys(snap.val())[0];
    }

    new Promise((resolve,reject)=>{
      let user = firebase.auth().currentUser;
      let authInfo = {
        displayName:user.displayName,
        email:user.email,
        emailVerified:user.emailVerified,
        isAnonymous:user.isAnonymous,
        phoneNumber:user.phoneNumber,
        photoURL:user.photoURL,
        uid:user.uid,
        refreshToken:user.refreshToken
      }
      resolve(authInfo)
    })
    .then((authInfo)=>{
      console.log('1 .set auth info',authInfo)    
      userInf.authInfo = authInfo
      return userInf

    })
    .then((userInf)=>{

      //check  emailVerified
      console.log('2. check  emailVerified',userInf.emailVerified,userInf.authInfo.emailVerified)  
      
      if(userInf.emailVerified !== userInf.authInfo.emailVerified){

        // return new Promise((resolve,reject)=>{
        //   auth.verifieEmail(userInf.authInfo.emailVerified)
        //   .then((res)=>{
        //     console.log('-->2.1 verifieEmail')  
        //     userInf.emailVerified = userInf.authInfo.emailVerified
        //     resolve(userInf)
        //   })
        //   .catch((error)=>{
        //     reject(error)
        //   })
        // })
        return new Promise((resolve,reject)=>{
          dbUser.orderByChild("authId").equalTo(userInf.authInfo.uid).once('value')
          .then((snap)=>{
            return dbUser.child(Object.keys(snap.val())[0]).update({emailVerified:userInf.authInfo.emailVerified})
          }).then((res)=>{
            resolve(userInf);
          }).catch(function(error) {
            reject(error)
          });
    
        })

      }else{
        return userInf
      }

      //return userInf
      
    })
    .then((userInf)=>{

      console.log('3. dispatch user info to reducer and save cookie')    
      dispatch({
        type: actionType.LOAD_USER_INFO,
        payload: userInf
      })
      
      cookie.save('__session', {userInf}, { path: '/' })
    })
    .catch((error)=>{
      console.log('error',error)
    })
    //resolve(snap)
  })

}


module.exports = {
  addUser,
  loadUser,
  updateAddr,
  updateUser,
  updateUserEmail,
  fbLoadUserListener
  
}