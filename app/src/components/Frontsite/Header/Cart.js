import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/md';

class Cart extends Component {


	render() {

    const { Carts } = this.props

    let cNow = 0;

    //console.log(Carts.lists);
    if(Carts.lists !== undefined && Carts.lists.length > 0){
      cNow = Carts.lists.reduce((acc,c) => acc + c.qty,0)
    }
    

		return (

      <div>
        <div className="Cart" onClick={()=>this.props.historya.push('/cart')}>
          <icons.MdShoppingCart size="34" />
          <div className="Badge" >{cNow}</div>
        </div> 
      </div>

		);
	}

}


const mapStateToProps = (state) => {
  return {
    Carts:state.Carts,
    historya:state.RouteInfo.history
  }
}

export default connect(mapStateToProps,{})(Cart);