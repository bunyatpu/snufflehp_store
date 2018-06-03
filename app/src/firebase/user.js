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

const loadUser = (userId) =>{
  //console.log('userId',userId);
  var fbRef = firebase.database().ref('users')
  return fbRef.orderByChild("authId").equalTo(userId).once('value')
}

module.exports = {
  addUser,
  loadUser
}