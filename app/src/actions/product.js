// import { 
//   getProductDB,
//   saveProductDB,
//   delProductDB,
//   uploadImage,
//   getNewEntry ,
//   getProductPromote
// } from '../firebase/firebase'
import database from 'firebase-database';
import actionType from '../constants'

export const loadProducts = () => {
  return (dispatch) => {

    database.getProductDB()
      .then( (products) => {

        let prodVal = (products.val() === null) ? {}:products.val();

        dispatch({
          type: actionType.LOAD_PRODUCT_SUCCESS,
          payload: prodVal
        })
      })
      .catch(error => {
        dispatch({
          type: actionType.LOAD_PRODUCT_FAILED,
          payload: error
        })
      })
  }
}

export const saveProduct = (payload) =>{

  return (dispatch) => {

    //upload image
    //console.log('payload,',payload);
    dispatch({
      type:actionType.ADD_PRODUCT_STATE,
      payload:1
    });
    
    if(payload.imgFile !== undefined && payload.imgFile !== ''){

      database.uploadImage(payload.imgFile).then( (snap) => {

        //save to firebase
        payload.imgPath = 'img_products/'+payload.imgFile.name;
        delete payload.imgFile;
        database.saveProductDB(payload).then((res)=>{
  
          //save to redux
          dispatch({
            type:actionType.ADD_PRODUCT_SUCCESS,
            payload
          });
          dispatch({
            type:actionType.ADD_PRODUCT_STATE,
            payload:2
          });
          
        }).catch((error)=>{
          console.log('error,',error);
          dispatch({
            type:actionType.ADD_PRODUCT_STATE,
            payload:3
          });
          
        });
      });

    }else{


      database.saveProductDB(payload).then((res)=>{
  
        //save to redux
        dispatch({
          type:actionType.ADD_PRODUCT_SUCCESS,
          payload
        });
        dispatch({
          type:actionType.ADD_PRODUCT_STATE,
          payload:2
        });
        
      }).catch((error)=>{
        console.log('error,',error);
        dispatch({
          type:actionType.ADD_PRODUCT_STATE,
          payload:3
        });
        
      });

    }
    

    
  }
}

export const delProduct = (keyProduct) => {

  // console.log('delProduct');
  // console.log(keyProduct);

  return (dispatch) => {

    database.delProductDB(keyProduct).then(()=>{

      dispatch({
        type:actionType.DETETE_PRODUCT, 
        payload:keyProduct
      });

    }).catch((error)=>{
      console.log('error');
      console.log(error);
      
    });

   
  }

}

export const loadNewEntry = () => {

  return (dispatch) => {

    //console.log('getNewEntry');
    
    database.getNewEntry()
      .then( (products) => {

        //console.log('-->products:',products);
        
        let prodVal = (products === null) ? {}:products;

        dispatch({
          type: actionType.LOAD_NEW_ENTRY,
          payload: prodVal
        })
      })
      .catch(error => {
        console.log('error->',error);
      })
  }

}

export const loadProductPromote = () =>{
  return (dispatch) => {
    database.getProductPromote((snap)=>{
      let prodVal = (snap.val() === null) ? {}:snap.val();

        dispatch({
          type: actionType.LOAD_PRODUCT_PROMOTE,
          payload: prodVal
        })
    });
  }
  
}
