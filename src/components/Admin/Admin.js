import React, { Component } from 'react';
import { Route } from 'react-router';
import {Helmet} from "react-helmet";
import SideNavbar from '../../components/Admin/SideNavbar'
import routes from '../../config/configRoute'

import 'font-awesome/css/font-awesome.min.css'; 
import './Admin.css';



// const Menu1 = () => <div><u>Menu 1 View</u></div>;
// const Menu2 = () => <div><i>Menu 2 View</i></div>;
// const SubMenu = () => <div><s>SubMenu View</s></div>;

export default class Admin extends Component {


	render() {

		return (

			<div className="App" style={{backgroundColor:'#f5f5f5'}}>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Shop Book Admin</title>
				</Helmet>
				
        <SideNavbar {...this.props} />

				<div className="page">
					<Route
							path={`${this.props.match.path}/:name`}
							render={(props) => {

								let compntNow = routes.admin.filter((r) => r.to === this.props.match.path+'/'+props.match.params.name);
								let ComtNow = compntNow[0].component;

								return (ComtNow === undefined) ? 'no component':	<ComtNow />
								
							}}
						/>
				</div>

			</div>
			
		);
	}

}


	// render() {

	// 	return (

	// 		<div className="App" style={{backgroundColor:'#f5f5f5'}}>
	// 			<Helmet>
	// 				<meta charSet="utf-8" />
	// 				<title>Shop Book Admin</title>
	// 			</Helmet>
				
  //       <SideNavbar {...this.props} />

	// 			<div >
	// 				<Route
	// 						path={`${this.props.match.path}/:name`}
	// 						render={({ match }) => {
								
	// 							console.log(match);
	// 							return(
	// 							<div>
	// 								{" "}
	// 								<h3>a {match.params.name} a</h3>
	// 							</div>
	// 							)
	// 						}}
	// 					/>
	// 			</div>

	// 		</div>
			
	// 	);
	// }