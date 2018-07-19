import actionType from '../constants'
import { saveCart } from "../firebase/CartsDB";

export const addCart = (data) => {
  return (dispatch,ownProps) => {
    //console.log('act ownProps',ownProps().Carts)

    //console.log('addCart=>',data)

    let prevState = ownProps().Carts;

    let newList = [...prevState.lists];

      let findIndex = prevState.lists.findIndex(item => item.prodId === data.carts.prodId)
      
      if(findIndex < 0){
        newList.push(data.carts)
      }else{
    
        newList[findIndex] = {...prevState.lists[findIndex],qty:parseInt(data.carts.qty,0)}
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
