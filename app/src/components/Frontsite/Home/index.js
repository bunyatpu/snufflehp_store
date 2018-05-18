import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadNewEntry} from '../../../actions/product';
import {Grid,Divider,Container} from 'semantic-ui-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouseProview from './CarouselPreview'
import HighlightBox from './HighlightBox'



class Home extends Component {

  componentWillMount() {
    //this.props.loadNewEntry();
    //console.log('componentWillMount all state',this.props.stateAll, 'products length',this.props.products.length);
    this.props.loadNewEntry();
   
  }


	render() {

    // console.log('===>render stateAll props:',this.props.stateAll);
    // console.log('===>render products props:',this.props.products);
    

		return (

      <Grid verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width="16">
            <CarouseProview  {...this.props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="16" >
            <HighlightBox items={this.props.products} title="มาใหม่" />
            <Container><Divider /></Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
		);
	}

}

const mapStateToProps = (state) => {
  return {
    products: state.Products,
    stateAll:state
  }
}

export default connect(mapStateToProps, {loadNewEntry})(Home);