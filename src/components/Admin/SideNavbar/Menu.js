import React, { Component } from 'react';
import { Redirect } from 'react-router'
import MetisMenu from 'react-metismenu';
import './react-metismenu-standart.css';
//import RouterLink from 'react-metismenu-router-link';
import CustomLink from './CustomLink';
import routes from '../../../config/configRoute'


export default class Menu extends Component {


	render() {
		
		let pathNow 	= this.props.location.pathname;
		let curUrl 		= window.location.pathname;
		let setDef 		= (curUrl === '/admin') ? true:false;

		const content=routes.admin;
	
		return (
			<div className="main-menu">
				{
					setDef ? 	(<Redirect to="/admin/dashboard" />)
					:(
						<MetisMenu content={content} 
							LinkComponent={CustomLink} 
							activeLinkTo={pathNow}  
						/>
					)
				}
			
			</div>
				
		);
	}

}



// const content=[
// 	{
// 		icon: 'dashboard',
// 		label: 'Menu 1',
// 		to: '/admin/menu-1',
// 	},
// 	{
// 		icon: 'bell',
// 		label: 'Menu 2',
// 		to: '/admin/menu-2',
// 	},
// 	{
// 		icon: 'bolt',
// 		label: 'Menu 3',
// 		content: [
// 			{
// 				icon: 'bolt',
// 				label: 'Sub Menu',
// 				to: '/admin/sub-menu',
// 			},
// 		],
// 	},
// 	{
// 		icon: 'external-link',
// 		label: 'External Link',
// 		externalLink: true,
// 		to: 'https://www.google.com',
// 	},
// ];
// render() {

// 	return (
// 		<div className="main-menu">
// 			<h5 className="sidenav-heading">Main</h5>
// 			<ul id="side-main-menu" className="side-menu list-unstyled">                  
// 				<li><a href="index.html"><Home size={24} /> <span>Home</span></a></li>
// 				<li><a href="forms.html"> Forms</a></li>
// 				<li className="active"><a href="charts.html">Charts</a></li>
// 				<li><a href="tables.html"> Tables</a></li>
// 				<li><a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse"> Example dropdown </a>
// 					<ul id="exampledropdownDropdown" className="collapse list-unstyled ">
// 						<li><a href="">Page</a></li>
// 						<li><a href="">Page</a></li>
// 						<li><a href="">Page</a></li>
// 					</ul>
// 				</li>
// 				<li><a href="login.html">Login page </a></li>
// 				<li> <a href=""> Demo
// 						<div className="badge badge-warning">6 New</div></a></li>
// 			</ul>
// 		</div>
			
// 	);
// }