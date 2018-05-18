import React, { Component } from 'react';
import {
  Header,Container
} from 'semantic-ui-react';
import 'react-virtualized/styles.css'; // only needs to be imported once


class AdminLayout extends Component {


	render() {

		return (
			<div>
				<Header
					as='h3'
					textAlign='center'
					style={{padding: '.8em',color:'#fff',background: '#393836'}}
					content='จัดการสินค้า'
				/>

				<Container style={{marginTop:'30px'}}>
					{this.props.children}
				</Container>
			</div>
				
		);
	}

}


export default AdminLayout;