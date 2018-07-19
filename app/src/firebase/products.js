const firebase = global.admin || require('firebase');

const getProductByName = (name) =>{
  //console.log('userId',userId);
  var fbRef = firebase.database().ref('products')
  return fbRef.orderByChild("name").equalTo(name).once('value')
}

const getById = (id) => {

  //console.log('getById id:',id)
  var fbRef = firebase.database().ref('products')
  return fbRef.child(id).once('value')
}

const getByIds = (ids) => {

  var fbRef = firebase.database().ref('products')

  var promises = ids.map((id)=>{
    return fbRef.child(id).once('value').then((snap)=>{
      return {key:id,snap}
    })  
  })


  return Promise.all(promises).then((res)=>{
    let posts = []

   // console.log('res',res)
    res.forEach((obj)=>{

      if(obj.snap.val() !== undefined){
        //console.log('snap item:',snap.val());
        //posts.push( {...obj.snap.val(),prodId:obj.key} );

        posts[obj.key] =  {...obj.snap.val(),prodId:obj.key};
      }
    })

    return posts
  })
}

module.exports = {
  getProductByName,
  getByIds,
  getById
}