import React, { Component } from 'react';
import SidebarHeader from './SidebarHeader'
import Menu from './Menu'
//import style from 'librarys/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
import './SideNavbar.css';


export default class SideNavbar extends Component {


	render() {

		return (

			<nav className="side-navbar mCustomScrollbar _mCS_1">
				<div id="mCSB_1" 
						className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" 
						style={{maxHeight:'none'}} >

						<SidebarHeader {...this.props} />
						<Menu {...this.props} />

				</div>
			</nav>
				
		);
	}

}