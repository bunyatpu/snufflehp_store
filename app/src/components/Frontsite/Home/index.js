import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadNewEntry} from '../../../actions/product';
import {Grid,Divider,Container,Button} from 'semantic-ui-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouseProview from './CarouselPreview'
//import HighlightBox from './HighlightBox'



class Home extends Component {

  componentWillMount() {

    this.props.loadNewEntry();
   
  }


	render() {

    //let {history} = this.props;
    //console.log('home props:',this.props);
    // console.log('===>render stateAll props:',this.props.stateAll);
    // console.log('===>render products props:',this.props.products);
    
    //<HighlightBox items={this.props.products} title="มาใหม่" />

		return (

      <Grid verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width="16">
            <CarouseProview  {...this.props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="16" >
            <Container>
              <Button color='teal' size="big">สั่งจอง แด่..รัก เดียวนี้</Button>
            </Container>
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