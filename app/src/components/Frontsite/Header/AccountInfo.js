import React, { Component } from 'react';
import { connect } from 'react-redux'
import {logOut} from '../../../actions/User';
import * as icons from 'react-icons/lib/md';
import {Grid, Popup,Menu} from 'semantic-ui-react';
//import MuiModalWrapped from '../../../components/common/Modal/MuiModal'
import MuiDialog from '../../../components/common/dialog/MuiDialog'
//import SignupForm from '../../../components/common/form/SignupForm'
import SigninForm from '../../../components/common/form/SigninForm'
import SignupFullForm from '../../../components/common/form/SignupFullForm'
import {setSignInOpen,setSignUpOpen} from '../../../actions/DialogAct';
// import { withCookies } from 'react-cookie';




class AccountInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      clickBack:false,
      dgSigninclickBack:false
    }
  }

  onOpenDialog = () =>{
    this.props.setSignUpOpen(true)
  }

  onCloseDialog = () => {
    //console.log('onCloseDialog')
    this.props.setSignUpOpen(false)
  }

  onSetClickBack = (lock) =>{
    this.setState({ clickBack:lock })
  }

  onDgSigninOpenDialog = () =>{
    //this.setState({ dgSigninOpen:true })
    this.props.setSignInOpen(true)
  }

  onDgSigninCloseDialog = () => {
    //this.setState({ dgSigninOpen:false })
    this.props.setSignInOpen(false)
   
  }

  onDgSigninSetClickBack = (lock) =>{
    this.setState({ dgSigninclickBack:lock })
  }

  onSignOut = () =>{

    //console.log('onSignOut');
    //localStorage.removeItem('userInfo');
    // const { history } = this.props;

    this.props.logOut(()=>{
      // if(cookies){
      //   cookies.remove('__session')
      // }
      //console.log('log out')
      this.props.historya.push('/');


    });

   

    // sessionService.deleteSession();
    //   sessionService.deleteUser();

  }

	render() {

    let { userInf,signIn,signUp } = this.props;
    // console.log('render routeInfo',routeInfo)
    // console.log('render userInf.username',userInf.userName)

    const showUser = (userInf && userInf.userName !== undefined) ? (
      <div >
        <Popup
          trigger={
            <span className="userNameAccount" style={{fontSize:"18px"}}>
              <icons.MdAccountCircle style={{marginRight:'3px'}} size="29" />
              {userInf.userName}
            </span>
          }
          wide={true}
          style={{padding:"0px"}}
          content={
            <Menu vertical>
              <Menu.Item name='myAccount' onClick={()=> this.props.historya.push('/user')}  >
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
      <div  >
        <a onClick={this.onOpenDialog}style={{marginRight:'5px'}}>สมัครใหม่</a>| 
        <a onClick={this.onDgSigninOpenDialog} style={{marginLeft:'5px'}}>เข้าสู่ระบบ</a>
      </div>
    )

    //userInf.userName = 444;

		return (

      <Grid textAlign='center' style={{fontSize:'12px'}}  verticalAlign='middle'>
        <Grid.Row verticalAlign='middle' >
          <Grid.Column style={{paddingLeft:'3px'}} textAlign='left'  width="11"  className="accTxt">
            {showUser}
            <MuiDialog 
              isOpen={signUp.isOpen}
              onCloseDialog={this.onCloseDialog}
              clickBack={true}
              size="sm"  >
              <SignupFullForm 
                onCloseDialog={this.onCloseDialog} 
                onSetClickBack={this.onSetClickBack}
              />
            </MuiDialog>

            <MuiDialog 
              isOpen={signIn.isOpen}
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
    userInf: state.User,
    historya:state.RouteInfo.history,
    signIn:state.Dialog.signIn,
    signUp:state.Dialog.signUp
  }
}


export default connect(mapStateToProps, {logOut,setSignInOpen,setSignUpOpen})(AccountInfo);

