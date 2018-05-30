const firebase = global.firebase || require('firebase');

const addUser = (data) => {

  var fbRef = firebase.database().ref('users')
  return fbRef.push({
    userName:data.userName,
    email:data.email,
    authId:data.authId,
    tel:""

  });

}

module.exports = {
  addUser
}