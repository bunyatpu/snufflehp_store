import actionType from '../constants'
import { saveCart } from "../firebase/CartsDB";
import { getById } from '../firebase/products'

export const addCart = (data) => {
  return (dispatch,ownProps) => {
    //console.log('act ownProps',ownProps().Carts)

    //console.log('addCart=>',data)

    let prevState = ownProps().Carts;

    let newList = [...prevState.lists];

    //console.log('prevState=>',prevState)

    let findIndex = prevState.lists.findIndex(item => item.prodId === data.carts.prodId)
    
    if(findIndex < 0){
      newList.push(data.carts)
    }else{
  
      newList[findIndex] = {...prevState.lists[findIndex],qty:parseInt(data.carts.qty,0)}
    }
    
    //data.cartList = newList;

    let newData = Object.assign({},data)
    newData.cartList = newList;

    //console.log('newList',newList)

    return new Promise((resolve,reject)=>{
      saveCart(newData).then((secc)=>{
        dispatch({
          type: actionType.ADDCART,
          payload: newList
        })
        resolve(secc)

      }).catch((error)=>{
        reject(error)
      })
    })

    

  }
}

export const manageCart = (data,delSet) => {
  return (dispatch,ownProps) => {
    //console.log('act ownProps',ownProps().Carts)

    //console.log('addCart=>',data)

    let prevState = ownProps().Carts;

    let newList = [...prevState.lists];

    let findIndex = prevState.lists.findIndex(item => item.prodId === data.carts.prodId)
    
    if(delSet === undefined){
      if(findIndex < 0){
        newList.push(data.carts)
      }else{
    
        newList[findIndex] = {...prevState.lists[findIndex],...data.carts}
      }
    }else if(findIndex >= 0){
      //remove
      newList.splice(findIndex,1)
    }

   
    
    //data.cartList = newList;
    let newData = Object.assign({},data)
    newData.cartList = newList;

    //console.log('newList',newList)

    return new Promise((resolve,reject)=>{
      saveCart(newData).then((secc)=>{

        //console.log('saveCart:',newList)
        dispatch({
          type: actionType.ADDCART,
          payload: newList
        })
        resolve(secc)

      }).catch((error)=>{
        reject(error)
      })
    })

    

  }
}

export const loadProdInf = (prodId) => {
  return (dispatch) => {

    getById(prodId).then((snap)=>{

      let prodVal = (snap.val() === null) ? {}:snap.val();

     
      prodVal.prodId = prodId

      dispatch({ 
        type:actionType.LOAD_PROD_TO_CART,
        payload:prodVal
      })

    }).catch((error)=>{
      console.log('error=>',error)
    })

  }
}

export const updateCartList = (userId,data) => {
  return (dispatch,ownProps) => {

    dispatch({ 
      type:actionType.UPDATE_CART_LIST,
      payload:data
    })

    //copy deep shadow and that update to firebase
    let cartNow = JSON.parse(JSON.stringify(ownProps().Carts));

    const newData = {
      uid:userId,
      cartList:cartNow.lists.map(i=>{
        return {checked:i.checked,prodId:i.prodId,qty:i.qty}
      })
    }
    //

    return new Promise((resolve,reject)=>{
      saveCart(newData).then((secc)=>{
        resolve(secc)
      }).catch((error)=>{
        reject(error)
      })
    })
  }
}

export const deleteCartList = (userId,data) => {
  return (dispatch,ownProps) => {

    dispatch({ 
      type:actionType.DELETE_CART_LIST,
      payload:data
    })

    //copy deep shadow and that update to firebase
    let cartNow = JSON.parse(JSON.stringify(ownProps().Carts));

    const newData = {
      uid:userId,
      cartList:cartNow.lists.map(i=>{
        return {checked:i.checked,prodId:i.prodId,qty:i.qty}
      })
    }
    //

    return new Promise((resolve,reject)=>{
      saveCart(newData).then((secc)=>{
        resolve(secc)
      }).catch((error)=>{
        reject(error)
      })
    })

    
  }
}
