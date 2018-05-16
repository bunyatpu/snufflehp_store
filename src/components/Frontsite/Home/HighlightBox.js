import React, { Component } from 'react';
import ProductCard from '../ProductLists/ProductCard'
import {Grid,Card,Loader} from 'semantic-ui-react';

export default class HighlightBox extends Component {

	render() {

    let style={
      color:'#444'
    }

    //console.log('itemsList:',this.props.items.length);
    if(this.props.items.length <= 0){
      return <Loader style={{marginTop:'10px',marginBottom:'10px'}} active inline='centered' ></Loader>
    }
    

    let list = this.props.items.map((item, index) =><ProductCard key={index} data={item} />)

		return (

      <Grid container  verticalAlign='bottom' style={style} >
        <Grid.Row  >
          <Grid.Column textAlign="left" floated="left" width="5"><h2>{this.props.title}</h2></Grid.Column>
          <Grid.Column textAlign="center" style={{color:'#509c84'}} floated="right" width="2"><h5>see more</h5></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="16">
            <Card.Group itemsPerRow={5} >
              {list}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
		);
	}

}