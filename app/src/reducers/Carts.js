import actionType from "../constants";

const Carts  = (state = {lists:[]}, action) =>{

  switch(action.type) {
    case actionType.ADDCART:


      // let newList = [...state.lists];

      // let findIndex = state.lists.findIndex(item => item.prodId === action.payload.prodId)
      
      // if(findIndex < 0){
      //   newList.push(action.payload)
      // }else{
    
      //   newList[findIndex] = {...state.lists[findIndex],qty:parseInt(state.lists[findIndex].qty,0)+parseInt(action.payload.qty,0)}
      // }



      return Object.assign({},state,{...state,lists:action.payload});


    default:
      return state
  }

}

export default Carts;