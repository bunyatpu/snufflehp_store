import React, { Component } from 'react';
import {Grid,List} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css';

class MenuHeader extends Component {

  constructor(props){
    super(props)
    this.state = {
      "items":[
        {name:"หน้าหลัก",link:"/"},
        {name:"เปิดจอง แด่..รัก",link:"/preorder1"},
        {name:"แจ้งโอนเงิน",link:"/tran_status"},
        //{name:"ชำระเงิน",link:"/payment"},
        {name:"ติดต่อเรา",link:"/contact"}
      ],
      sel:"/"
    }
  }

  handleClick = (e,obj) =>{
    //console.log(obj);
    this.setState({
      sel:obj.item.link
    })
  }

	render() {

    let {items} = this.state;
    let {match} = this.props

    //console.log('match',match);
    //console.log('menu pros',this.props)

    let pathNow = (match !== undefined) ? match.path:'/';
    
    let lists  = items.map( (item, key) => {
      //let selNow = (item.link === pathNow) ? true:false
      return <List.Item 
          active={(item.link === pathNow) ? true:false} 
          as={Link} 
          to={item.link} 
          key={key} 
          item={item} 
          onClick={this.handleClick} >{item.name}
        </List.Item>
    });

		return (

      <Grid container textAlign='center' verticalAlign='middle'  >
        <Grid.Row >
          <Grid.Column width="3" ></Grid.Column>
          <Grid.Column width="9" >
            <List link horizontal inverted verticalAlign='middle' >
              {lists}
            </List>
          </Grid.Column>
          <Grid.Column width="4" ></Grid.Column>
        </Grid.Row>
      </Grid>
      
			
		);
	}

}

const mapStateToProps = (state) => {
  return {
    match: state.RouteInfo.match
  }
}

export default connect(mapStateToProps, {})(MenuHeader);;