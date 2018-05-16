import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import Logo from './Logo';
import Search from "./Search"
import Cart from "./Cart"
import AccountInfo from "./AccountInfo"

export default class Header extends Component {


	render() {

    let style = {}

		return (

      <Grid container textAlign='center' verticalAlign='middle'  >
        <Grid.Row >
          <Grid.Column width="3" style={style} >
            <Logo {...this.props} />
          </Grid.Column>
          <Grid.Column width="10" style={style}>
            <Search {...this.props} />
            <Cart />
          </Grid.Column>
          <Grid.Column width="3" style={style} >
            <AccountInfo />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
			
		);
	}

}