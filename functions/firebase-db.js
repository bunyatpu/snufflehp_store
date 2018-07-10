//const firebase = require('firebase');
const firebase = global.admin || require('firebase');

const initializeApp = (keys) => {
  if (firebase.apps.length === 0) {

    firebase.initializeApp(keys);
  }
};

const getNewEntry = () => {

  const prod = firebase.database().ref().child('products');
  const newEntry = firebase.database().ref().child('newEntry');

  return new Promise((resolve,reject) =>{
    newEntry.once('value',function(snap){

      //console.log('snap:',snap.val());
      
      return snap.val()
 
    }).then((child)=>{

      //console.log('child:',child.val());
      
      let promises = child.val().map((obj)=>{
        return prod.child(obj.productId).once('value');
      })

      let posts = [];

      Promise.all(promises).then((snaps)=>{
        snaps.forEach((snap)=>{
          if(snap !== undefined){
            //console.log('snap item:',snap.val());
            posts.push(snap.val());
          }
        })

        resolve(posts);
      })

    })
  });

}

const getProductPromote = (cb) =>{

  const prodRef = database.ref().child('products');
  const newEntryRef = database.ref().child('newEntry');

  newEntryRef.on('child_added',(snapEntry)=>{
    prodRef.child(snapEntry.val().productId).once('value',cb);
  })

}

const getProductDB = () => {
  return database.ref('/products').once('value')
}

const saveProductDB = (newProduct) => {
  //console.log('saveProductDB..');
  //console.log(newProduct);

  let fnDb =  database.ref('/products').orderByChild('no').limitToLast(1).once('value').then( (snap) =>{
    //console.log('snap',snap.val());

    let newRun = 1; 
    if(snap.val() !== null){

      let lastItem  = Object.values(snap.val())[0];
      //console.log('no,',lastItem.no);
      newRun    = lastItem.no ? parseInt(lastItem.no,10) + 1:1;

    }

    let c_type = '';
    switch(newProduct.product_type){
      case 'book':
        c_type = '01';
      break;
      default:
        c_type = '02';
      break;
    }
    newRun = newRun.toString()
    newProduct.code = 'C'+c_type+(newRun.padStart(6,0));
    newProduct.no = newRun;

    return database.ref('/products').push(newProduct);

  })

  //console.log('fnDb,',fnDb);
  
  return fnDb;
}

const delProductDB = (key) => {

  return database.ref('/products').child(key).remove()
}

module.exports = {
  initializeApp,
  getNewEntry,
  getProductPromote,
  getProductDB,
  saveProductDB,
  delProductDB
};