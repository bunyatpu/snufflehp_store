import React, { Component } from 'react';
import {Grid,List} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//import * as icons from 'react-icons/lib/md';


import 'semantic-ui-css/semantic.min.css';
export default class MenuHeader extends Component {

  constructor(props){
    super(props)
    this.state = {
      "items":[
        {name:"หน้าหลัก",link:"/"},
        {name:"เปิดจอง แด่..รัก",link:"/preorder1"},
        {name:"แจ้งโอนเงิน",link:"/tran_status"},
        {name:"ชำระเงิน",link:"/payment"},
        {name:"ติดต่อเรา",link:"/contact"}
      ],
      sel:"/"
    }
    // this.state = {
    //   "items":[
    //     "หน้าหลัก",
    //     "หนังสือทั้งหมด",
    //     "ชำระเงิน",
    //     "เปิดจอง",
    //     "นิยายออกใหม่",
    //     "มาโปรด",
    //     "ไร้พ่าย",
    //     "The Tens",
    //     "ติดต่อเรา"
    //   ]
    // }
  }

  handleClick = (e,obj) =>{
    //console.log(obj);
    this.setState({
      sel:obj.item.link
    })
  }

	render() {

    let {items,sel} = this.state;
    //console.log('sel',sel);
    
    let lists  = items.map( (item, key) => {
      //console.log(item.link,sel);
      
      let selNow = (item.link === sel) ? true:false
      return <List.Item 
                active={selNow} 
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