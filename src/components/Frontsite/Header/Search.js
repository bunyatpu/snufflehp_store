import React, { Component } from 'react';
import * as icons from 'react-icons/lib/md';

export default class Search extends Component {


	render() {

		return (

      <div className="SearchInput" >
        <input style={{background:'#e2e2e2'}} type="text" id="" placeholder="ค้นหานิยาย" />
        <button className="btnSearch" style={{color:"#323340"}}>
          <icons.MdSearch style={{fontSize:"30px"}} />
        </button>
      </div>

		);
	}

}