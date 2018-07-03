const firebase = global.firebase || require('firebase');

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

const currentUser = () =>{
  //return firebase.auth().currentUser;
  

  return new Promise((resolve,reject)=>{
    firebase.auth().onAuthStateChanged(function(user) {

      console.log('onAuthStateChanged')
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

const verifieEmail = () =>{
  
  return Promise.resolve().then(()=>{
    return new Promise((resolve,reject)=>{
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user)
        } else {
          reject(user)
        }
      });
    })
  }).then(user =>{
    return user.sendEmailVerification()
  })
}

const updateEmail = (newEmail) => {
  var user = firebase.auth().currentUser;

  return Promise.resolve().then(()=>{
    return new Promise((resolve,reject)=>{
      user.updateEmail(newEmail).then(function() {
        resolve('succ');
      }).catch(function(error) {
        reject(error)
      });
    })
  }).then((res)=>{
    console.log('after update mail');
    return user.sendEmailVerification()
  })
}

module.exports = {
  signUp,
  signIn,
  currentUser,
  updatePassword,
  verifieEmail,
  updateEmail
}

