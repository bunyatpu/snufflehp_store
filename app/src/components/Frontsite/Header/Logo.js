import React, { Component } from 'react';

export default class Logo extends Component {


	render() {

    let sty1 = {fontSize:'20px'};
    let sty2 = {
        fontSize:'22px',
        color:'orange'
      }

		return (

     <div >
       <span style={sty1}>Snuffle</span>
       <span style={sty2}>HP</span>
     </div>
		);
	}

}