import React, { Component } from 'react';
import * as icons from 'react-icons/lib/md';

export default class Cart extends Component {


	render() {


    let cNow = 8;

		return (

      <div>
        <div className="Cart">
          <icons.MdShoppingCart size="34" />
          <div className="Badge" >{cNow}</div>
        </div> 
      </div>

		);
	}

}

/*   */