import actionType from '../constants'


const ProductDetail =  (state = [], action) => {
  
  switch(action.type) {
   
    case actionType.LOAD_PRODUCT_BY_NAME:
      //console.log('===>REDUCER LOAD_NEW_ENTRY',action.payload);
      return Object.assign({},action.payload)
    default:
      return state
  }
}

export default ProductDetail;