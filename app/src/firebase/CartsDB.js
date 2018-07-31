const firebase = global.admin || require('firebase');

const saveCart = (model) =>{
  //console.log('userId',userId);

  //check exist
  var fbRef = firebase.database().ref('users').child(model.uid)
  let carts = model.cartList;
  return fbRef.update({carts});
  //console.log('--->',resUp)
  //return fbRef.update(model)
  //--

  // var fbRef = firebase.database().ref('users')
  // return fbRef.push(model);
}


module.exports = {
  saveCart
}