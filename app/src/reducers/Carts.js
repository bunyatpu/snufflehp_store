import actionType from "../constants";


const Carts  = (state = {lists:[]}, action) =>{

  let newList   = [...state.lists];
  let findIndex = null

  switch(action.type) {
    case actionType.ADDCART:

      let newCartsList1 = [...newList];

      //console.log('state.list ',state.lists,' payload',action.payload)

      action.payload.forEach(ele => {
        const hIndex = newCartsList1.findIndex(item => item.prodId === ele.prodId)
        //console.log('hIndex',hIndex)
        if(hIndex < 0){
          newCartsList1.push(ele)
        }else{
          newCartsList1[hIndex] = {...state.lists[hIndex],...ele}
        }

      })

      //console.log('newCartsList1',newCartsList1);

      return Object.assign({},state,{...state,lists:newCartsList1});
      //return Object.assign({},state,{...state,lists:action.payload});

    case actionType.LOAD_PROD_TO_CART:

      findIndex = state.lists.findIndex(item => item.prodId === action.payload.prodId)

      if(findIndex < 0){
        newList.push(action.payload)
      }else{
        newList[findIndex] = {...state.lists[findIndex],prodInf:action.payload}
      }

      return {...state,lists:newList}
  
    case actionType.UPDATE_CART_LIST:

      findIndex = state.lists.findIndex(item => item.prodId === action.payload.prodId)

      if(findIndex < 0){
        newList.push(action.payload)
      }else{
        newList[findIndex] = {...state.lists[findIndex],...action.payload}
      }

      const resUpdate = {...state,lists:newList}
      
      //console.log('resUpdate',resUpdate)
   
      return resUpdate
      //return {...state}
 
    case actionType.DELETE_CART_LIST:

      findIndex = state.lists.findIndex(item => item.prodId === action.payload.prodId)
      if(findIndex >= 0){
        newList.splice(findIndex,1)
      }

      return {...state,lists:newList}
    default:
      return state
  }

}

export default Carts;