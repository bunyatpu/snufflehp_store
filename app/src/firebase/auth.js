const firebase = global.firebase || require('firebase');

const signUp = (data) =>{

  var email = data.email;
  var password = data.password;
  
  return firebase.auth().createUserWithEmailAndPassword(email,password)
}

module.exports = {
  signUp
}

