import React, { Component } from 'react';
import * as icons from 'react-icons/lib/md';
import {Grid} from 'semantic-ui-react';

export default class AccountInfo extends Component {


	render() {

		return (

      <Grid textAlign='center' style={{fontSize:'12px'}} verticalAlign='middle'>
        <Grid.Row >
          <Grid.Column width="3" className="accIcon">
            <icons.MdAccountCircle size="39" />
          </Grid.Column>
          <Grid.Column textAlign='left' width="13" className="accTxt">
            <div>Sign in</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

		);
	}

}

