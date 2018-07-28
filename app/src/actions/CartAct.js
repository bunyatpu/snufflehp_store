import actionType from '../constants'
import { saveCart } from "../firebase/CartsDB";

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

   
    
    data.cartList = newList;

    //console.log('newList',newList)

    return new Promise((resolve,reject)=>{
      saveCart(data).then((secc)=>{
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
