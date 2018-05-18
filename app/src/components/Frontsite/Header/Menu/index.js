import React, { Component } from 'react';
import {Grid,List} from 'semantic-ui-react';
//import * as icons from 'react-icons/lib/md';


import 'semantic-ui-css/semantic.min.css';
export default class MenuHeader extends Component {

	render() {

		return (

      <Grid container textAlign='left' verticalAlign='middle'  >
        <Grid.Row >
          <Grid.Column width="3" ></Grid.Column>
          <Grid.Column width="9" >
            <List horizontal verticalAlign='middle'>
              <List.Item>หน้าหลัก</List.Item>
              <List.Item>หนังสือ</List.Item>
              <List.Item>ชำระเงิน</List.Item>
              <List.Item>เปิดจอง</List.Item>
              <List.Item>นิยายออกใหม่</List.Item>
              <List.Item>มาโปรด</List.Item>
              <List.Item>ไร้พ่าย</List.Item>
              <List.Item>The Tens</List.Item>
              <List.Item>about me</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width="4" ></Grid.Column>
        </Grid.Row>
      </Grid>
      
			
		);
	}

}