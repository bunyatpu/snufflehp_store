const firebase = global.firebase || require('firebase');

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
  //console.log('updateUser uid',uid)
  var fbRef = firebase.database().ref('users').child(uid)

  return fbRef.update({
    userName:data.userName,
    tel:data.tel
  })
}

const updateAddr = (uid,address) => {

  //console.log('updateAddr',uid,address)
  var fbRef = firebase.database().ref('users').child(uid)
  //var resUp = fbRef.update({address});
  //console.log('--->',resUp)
  return fbRef.update({address})

}

const loadUser = (userId) =>{
  //console.log('userId',userId);
  var fbRef = firebase.database().ref('users')
  return fbRef.orderByChild("authId").equalTo(userId).once('value')
}

module.exports = {
  addUser,
  loadUser,
  updateAddr,
  updateUser
}