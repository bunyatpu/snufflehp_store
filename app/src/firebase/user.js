const firebase = global.firebase || require('firebase');

const addUser = (data) => {

  let model = {
    userName:data.userName,
    email:data.email,
    authId:data.authId,
    tel:""
  }
  var fbRef = firebase.database().ref('users')
  return fbRef.push(model);

  

  // return new Promise((resolve, reject)=>{
  //   fbRef.push(model).then((resSave)=>{
  //       resolve(model)
  //     }).catch((error)=>{
  //       reject(error)
  //     })
  // })

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