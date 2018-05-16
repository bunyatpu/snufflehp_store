import React, { Component } from 'react';
import avtImg from '../../../images/avatar-1.jpg'

export default class SidebarHeader extends Component {


	render() {

		return (

			<div className="sidenav-header d-flex align-items-center justify-content-center">
				<div className="sidenav-header-inner text-center">
					<img  src={avtImg} alt="person" className="img-fluid rounded-circle mCS_img_loaded" />
					<h2 style={{fontSize:'.8rem'}}>SnuffleHP</h2>
					<span>Writer</span>
				</div>
				<div className="sidenav-header-logo">
					<a href="index.html" className="brand-small text-center"> 
						<strong>B</strong>
						<strong className="text-primary">D</strong>
					</a>
				</div>
			</div>
				
		);
	}

}