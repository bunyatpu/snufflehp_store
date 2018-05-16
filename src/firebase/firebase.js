import firebase from 'firebase'
import {fkey} from '../firebase_key'

let database
let storage

export const init = () => {
  let config = fkey;
  firebase.initializeApp(config)
  database = firebase.database()
  //storage = firebase.storage();


  // const prod = database.ref().child('products');
  // const newEntry = database.ref().child('newEntry');

  // newEntry.orderByKey().on('child_changed',(snap)=>{
  //   console.log('testsnap:',snap.val());
  // });

  // const query = prod.orderByChild('price').equalTo('400');

  //const query = prod.orderByChild('name').startAt('ทดสอบสินค้า').endAt('ทดสอบสินค้า\uf8ff');

  // query.once('value',function(snap){
  //   console.log('-->',snap.val());
  // });


  // newEntry.limitToFirst(10).on('child_added',function(snap){
  //   console.log('-->',snap.val());
  //   prod.child(snap.val().productId).once('value',function(prodMod){
  //     console.log('prodMod->',prodMod.val());
  //   });
  // });

}



export const getNewEntry = () => {

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

      // child.val().forEach((val) =>{
  
      //   prod.child(val.productId).once('value',function(snap){

      //     posts.push(snap.val());

      //     if(posts.length === (child.val().length - 1)){
      //       resolve(posts);
      //     }

      //   })

      // });
    
    })
  });

}

export const getProductPromote = (cb) =>{

  const prodRef = database.ref().child('products');
  const newEntryRef = database.ref().child('newEntry');

  newEntryRef.on('child_added',(snapEntry)=>{
    prodRef.child(snapEntry.val().productId).once('value',cb);
  })

}

export const getProductDB = () => {
  return database.ref('/products').once('value')
}

export const saveProductDB = (newProduct) => {
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

export const delProductDB = (key) => {

  return database.ref('/products').child(key).remove()
}

export const uploadImage = (file) =>{
  return storage.ref('/img_products').child(file.name).put(file)
}



