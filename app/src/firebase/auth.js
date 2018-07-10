const firebase = global.admin || require('firebase');
//const user = require('./user')

const signUp = (data) =>{

  var email = data.email;
  var password = data.password;

  return firebase.auth().createUserWithEmailAndPassword(email,password)
}

const signIn = (data) =>{

  var email = data.email;
  var password = data.password;
  
  return firebase.auth().signInWithEmailAndPassword(email,password)
}

const regisUser = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('regisUser',user);
  })
}

const currentUser = () =>{
  //return firebase.auth().currentUser;
  return new Promise((resolve,reject)=>{
    firebase.auth().onAuthStateChanged(function(user) {

      
      if (user) {
        let authInfo = {
          displayName:user.displayName,
          email:user.email,
          emailVerified:user.emailVerified,
          isAnonymous:user.isAnonymous,
          phoneNumber:user.phoneNumber,
          photoURL:user.photoURL,
          uid:user.uid,
          refreshToken:user.refreshToken

        };

        console.log('onAuthStateChanged',authInfo)
        resolve(authInfo)
      } else {
        reject(user)
      }
    });
  });
}

const updatePassword = (newPassword) => {

  return new Promise((resolve,reject) =>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.updatePassword(newPassword).then(function() {
          resolve('succ')
        }).catch(function(error) {
          reject(error)
        });
      } else {
        reject('get current user error!!!')
      }
    });
  })
}

const verifieEmail = (setVer) =>{
  var userCurrent = firebase.auth().currentUser;
  var dbUser = firebase.database().ref('users');

  return Promise.resolve().then(()=>{
    return new Promise((resolve,reject)=>{
      dbUser.orderByChild("authId").equalTo(userCurrent.uid).once('value')
      .then((snap)=>{
        setVer = (setVer === undefined)? true:setVer
        return dbUser.child(Object.keys(snap.val())[0]).update({emailVerified:setVer})
      }).then((res)=>{
        resolve(res);
      }).catch(function(error) {
        reject(error)
      });

    })
  })
}

const updateEmail = (newEmail) => {
  var userCurrent = firebase.auth().currentUser;
  var dbUser = firebase.database().ref('users');

  return Promise.resolve().then(()=>{
    return new Promise((resolve,reject)=>{
      userCurrent.updateEmail(newEmail).then(()=>{
        //return user.updateUserEmail(userCurrent.uid,newEmail)
        return dbUser.orderByChild("authId").equalTo(userCurrent.uid).once('value')
      }).then((snap)=>{
        return dbUser.child(Object.keys(snap.val())[0]).update({email:newEmail,emailVerified:false})
      }).then((res)=>{
        resolve(res);
      }).catch(function(error) {
        reject(error)
      });

    })
  }).then((res)=>{
    //console.log('after update mail');
    let host = window.location.origin;
    var actionCodeSettings = {
      //url: 'http://localhost:3000/verify_email/' + firebase.auth().currentUser.email
      url:host
    };
    return userCurrent.sendEmailVerification(actionCodeSettings)
  })
}

module.exports = {
  signUp,
  signIn,
  currentUser,
  updatePassword,
  verifieEmail,
  updateEmail,
  regisUser
}

