import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Route } from 'react-router';
import routeMap from '../../config/configRoute'
import Header from "./Header"
import MenuHeader from "./Header/Menu"
//import {Grid} from 'semantic-ui-react';
import './Frontsite.css'
import 'semantic-ui-css/semantic.min.css';

import {Grid} from 'semantic-ui-react';

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
								<Route key={i} path={rt.path} render={(props) => (
									<rt.component {...props} routes={rt.routes} />
								)}/>
							))
						}
						</Grid.Column>
					</Grid.Row>
				</Grid>
        
			</div>
			
		);
	}

}

/* <div className="mainHeader">
          <Header />
        </div>
        <div className="mainMenu">
          menu
        </div>
        <div className="mainContent">
          Content
        </div> */