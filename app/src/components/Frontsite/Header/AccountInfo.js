import React, { Component } from 'react';
import * as icons from 'react-icons/lib/md';
import {Grid} from 'semantic-ui-react';
//import MuiModalWrapped from '../../../components/common/Modal/MuiModal'
import MuiDialog from '../../../components/common/dialog/MuiDialog'
import SignupForm from '../../../components/common/form/SignupForm'



export default class AccountInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      dialogOpen:false,
      clickBack:false
    }
  }

  onOpenDialog = () =>{
    this.setState({ dialogOpen:true })
  }

  onCloseDialog = () => {
    this.setState({ dialogOpen:false })
  }

  onSetClickBack = (lock) =>{
    this.setState({ clickBack:lock })
  }

  


	render() {

		return (

      <Grid textAlign='center' style={{fontSize:'12px'}} verticalAlign='middle'>
        <Grid.Row >
          <Grid.Column width="3" className="accIcon">
            <icons.MdAccountCircle size="29" />
          </Grid.Column>
          <Grid.Column textAlign='left' width="13" className="accTxt">
            <div><a onClick={this.onOpenDialog}>สมัครใหม่</a> | <a>ลงชื่อใช้งาน</a></div>
            <MuiDialog 
              isOpen={this.state.dialogOpen}
              onCloseDialog={this.onCloseDialog}
              clickBack={this.state.clickBack}
            >
              <SignupForm 
                onCloseDialog={this.onCloseDialog} 
                onSetClickBack={this.onSetClickBack}
              />
            </MuiDialog>
    
          </Grid.Column>
        </Grid.Row>
      </Grid>

		);
	}

}

