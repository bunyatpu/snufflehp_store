import React, { Component } from 'react';
import { connect } from 'react-redux'
import {logOut} from '../../../actions/User';
import * as icons from 'react-icons/lib/md';
import {Grid, Popup,Menu} from 'semantic-ui-react';
//import MuiModalWrapped from '../../../components/common/Modal/MuiModal'
import MuiDialog from '../../../components/common/dialog/MuiDialog'
import SignupForm from '../../../components/common/form/SignupForm'
import SigninForm from '../../../components/common/form/SigninForm'
import { withCookies } from 'react-cookie';




class AccountInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      dialogOpen:false,
      clickBack:false,
      dgSigninOpen:false,
      dgSigninclickBack:false
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

  onDgSigninOpenDialog = () =>{
    this.setState({ dgSigninOpen:true })
  }

  onDgSigninCloseDialog = () => {
    this.setState({ dgSigninOpen:false })
  }

  onDgSigninSetClickBack = (lock) =>{
    this.setState({ dgSigninclickBack:lock })
  }

  onSignOut = () =>{

    console.log('onSignOut');
    //localStorage.removeItem('userInfo');
    const { cookies } = this.props;
    this.props.logOut(()=>{
      if(cookies){
        cookies.remove('__session')
      }
    });

   

    // sessionService.deleteSession();
    //   sessionService.deleteUser();

  }

	render() {

    let { userInf } = this.props;
    console.log('render userInf',userInf)
    console.log('render userInf.username',userInf.userName)

    const showUser = (userInf && userInf.userName !== undefined) ? (
      <div>
        <Popup
          trigger={<span>{userInf.userName}</span>}
          wide={true}
          style={{padding:"0px"}}
          content={
            <Menu vertical>
              <Menu.Item name='myAccount'  >
                <span>บัญชีของฉัน</span>
              </Menu.Item>

              <Menu.Item name='singOut' onClick={this.onSignOut}>
                ออกจากระบบ
              </Menu.Item>
            </Menu>
          }
          on='hover'
          hoverable={true}
          verticalOffset ={10}
          position='bottom center'
        />
      </div>
    ):(
      <div>
        <a onClick={this.onOpenDialog}style={{marginRight:'5px'}}>สมัครใหม่</a>| 
        <a onClick={this.onDgSigninOpenDialog} style={{marginLeft:'5px'}}>ลงชื่อใช้งาน</a>
      </div>
    )

    //userInf.userName = 444;

		return (

      <Grid textAlign='center' style={{fontSize:'12px'}} verticalAlign='middle'>
        <Grid.Row >
          <Grid.Column width="3" className="accIcon">
            <icons.MdAccountCircle size="29" />
          </Grid.Column>
          <Grid.Column textAlign='left' width="13" className="accTxt">
            {showUser}
            <MuiDialog 
              isOpen={this.state.dialogOpen}
              onCloseDialog={this.onCloseDialog}
              clickBack={this.state.clickBack}
              size="sm"
            >
              <SignupForm 
                onCloseDialog={this.onCloseDialog} 
                onSetClickBack={this.onSetClickBack}
              />
            </MuiDialog>

            <MuiDialog 
              isOpen={this.state.dgSigninOpen}
              onCloseDialog={this.onDgSigninCloseDialog}
              clickBack={this.state.dgSigninclickBack}
              size="sm"
              fixWidth="fixWidth"
            >
              <SigninForm 
                onCloseDialog={this.onDgSigninCloseDialog} 
                onSetClickBack={this.onDgSigninSetClickBack}
              />
            </MuiDialog>
    
          </Grid.Column>
        </Grid.Row>
      </Grid>

		);
	}

}

const mapStateToProps = (state) => {
  return {
    userInf: state.User
  }
}

export default withCookies(connect(mapStateToProps, {logOut})(AccountInfo));

