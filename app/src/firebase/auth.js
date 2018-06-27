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
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('User is signed in.',user)
    } else {
      // No user is signed in.
    }
  });

  return '';
}

module.exports = {
  signUp,
  signIn,
  currentUser
}

