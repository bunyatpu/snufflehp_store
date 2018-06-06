import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Route } from 'react-router-dom';
import routeMap from '../../config/configRoute'
import Header from "./Header"
import MenuHeader from "./Header/Menu"
//import {Grid} from 'semantic-ui-react';
import './Frontsite.css'
import 'semantic-ui-css/semantic.min.css';

import {Grid} from 'semantic-ui-react';

import RouteInfo from '../common/Util/RouteInfo'

// import Home from './Home'
// import Preorder from './preorder'

export default class Frontsite extends Component {


	render() {

		return (

			<div className="App" >
				<Helmet>
					<meta charSet="utf-8" />
					<title>SnuffleHP</title>
				</Helmet>
				<Grid padded="vertically">
					<Grid.Row className="mainHeader"  >
						<Grid.Column >
							<Header />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row  style={{paddingTop:'0px'}} className="mainMenu">
						<Grid.Column>
							<MenuHeader />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row  style={{paddingTop:'0px'}}  className="mainContent">
						<Grid.Column>

							{
								routeMap.frontSite.map((rt, i) => (
									<Route key={i} exact={rt.exact} path={rt.path} component={RouteInfo(rt.component)}/>
								))
							}
							
						</Grid.Column>
					</Grid.Row>
				</Grid>
        
			</div>
			
		);
	}

}




/* <Route  exact={true} path="/" render={()=><h2>Home</h2>} />
<Route   path="/preorder1" render={()=><h2>order</h2>} /> */


// {
// 	routeMap.frontSite.map((rt, i) => (
// 		<Route key={i} exact={rt.exact} path={rt.path} render={(props) => (
// 			<rt.component  {...props} routes={rt.routes} />
// 		)}/>
// 	))
// }

