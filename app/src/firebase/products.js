const firebase = global.firebase || require('firebase');

const getProductByName = (name) =>{
  //console.log('userId',userId);
  var fbRef = firebase.database().ref('products')
  return fbRef.orderByChild("name").equalTo(name).once('value')
}

module.exports = {
  getProductByName
}