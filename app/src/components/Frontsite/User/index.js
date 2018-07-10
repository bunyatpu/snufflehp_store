import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Divider,
  Menu,
  Message,
  Button,
  Icon,
  Transition,
  Label
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm, change,SubmissionError } from "redux-form";
import { RenderTextField } from "../../common/form/RenderFields";
import { updateUser,loadUserInf } from "../../../actions/User";
import MuiDialog from "../../../components/common/dialog/MuiDialog";
import AddrForm from "../../../components/common/form/AddrForm";
import ChangeEmailForm from "../../../components/common/form/ChangeEmailForm";
import { signIn, updatePassword } from '../../../firebase/auth';
import { setChangeEmailOpen } from '../../../actions/DialogAct';

const validate = values => {
  //console.log('validate',values);
  const errors = {};

  if (!values.userName) {
    errors.userName = "ชื่อผู้ใช้ไม่ถูกต้อง";
  }

  if (!values.old_password) {
    errors.old_password = "กรุณากรอกรหัสผ่านเดิม";
  }

  if (!values.new_password) {
    errors.new_password = "กรุณากรอกรหัสผ่านใหม่";
  }

  if (!values.re_password) {
    errors.re_password = "ยืนยันรหัสผ่าน";
  }else if(values.new_password !== values.re_password){
    errors.re_password = "รหัสผ่านไม่ตรง"
  }


  return errors;
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "account",
      showSuccLabel: false,
      saving: false,
      addrForm: {
        isOpen: false
      },
      loading:false
    };
  }

  componentDidMount() {
    const { change, userInf } = this.props;

    change("userName", userInf.userName);
    change("tel", userInf.tel);
    // this.setState({loading:true})

    // loadUserInf(userInf.authId).then((res)=>{
    //   change("userName", userInf.userName);
    //   change("tel", userInf.tel);

    //   this.setState({loading:false})
    // }).catch((error)=>{
    //   console.log(error)
    //   this.setState({loading:false})
    // })
   
  }

  showMessageSecc = () => {
    this.setState({
      showSuccLabel: true,
      saving: false
    });

    setTimeout(() => {
      this.setState({
        showSuccLabel: false
      });
    }, 2000);
  };

  showEditAddress = () => {
    //console.log('onCloseDialog')
    //this.props.setSignUpOpen(false)
    this.setState({
      addrForm: {
        isOpen: true
      }
    });
  };

  onCloseDialog = () => {
    //console.log('onCloseDialog')
    //this.props.setSignUpOpen(false)
    this.setState({
      addrForm: {
        isOpen: false
      }
    });
  };

  onChangePassword = () =>{
    const { userForm,userInf } = this.props;
    //console.log('onChangePassword', userForm.values,userInf)
    this.setState({ saving: true});

    return signIn({
      email:userInf.email,
      password:userForm.values.old_password
    }).then(res => {

      //console.log('res check signIn',res);
      
      return updatePassword(userForm.values.new_password)
      .then((res)=>{
        //console.log(res)
        this.showMessageSecc();
      })
      .catch((error)=>{
        console.log('catch update password',error);
        this.setState({ saving: false});
        throw new SubmissionError({ new_password: 'ไม่สามารถเปลี่ยน password ได้ '+error, _error: error})
      })

    }).catch(error =>{
      
      //let msg = error.message
      console.log('catch signIn ',error,error.errors)
      this.setState({ saving: false});

      if(error.errors !== undefined){
        
        throw new SubmissionError({ new_password: error.errors.new_password, _error: error.errors.error})
      }else{
        throw new SubmissionError({ old_password: 'รหัสผ่านเดิมไม่ถูกต้อง', _error: error})
      }
    });
  }

  onCloseChangeEmailDialog = () => {
    console.log('onCloseChangeEmailDialog');
    this.props.setChangeEmailOpen(false);
  }

  onShowChangeEmailDialog = () =>{
    this.props.setChangeEmailOpen(true);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //save
  onSaveUser = value => {
    //console.log('onSaveUser', value)
    const { updateUser, userInf } = this.props;
    //console.log('onSaveUser', userInf)
    this.setState({
      saving: true
    });

    value.authId = userInf.authId;
    updateUser(userInf.id, value).then(res => {
      //console.log('succ onSaveUser',res)
      this.showMessageSecc();
    }).catch((err)=>{
      console.log('error onSaveUser',err)
    })
  }

  //--



  render() {
    const { activeItem, showSuccLabel, saving, addrForm ,loading} = this.state;
    const { userInf, handleSubmit,Dialog } = this.props;
    const addrInf = userInf.address;
    //console.log('userInf',userInf);
    const styleItem = { textAlign: "right", paddingRight: "30px" };

    let verified = (userInf.emailVerified !== undefined && userInf.emailVerified === true) ? true:false;

    let content = "รอสักครู่..";
    switch (activeItem) {
      case "account":
        content = <Grid style={{ marginTop: "10px" }}>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                Email
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {userInf.authInfo.email}
                <Transition visible={!verified} animation='scale' duration={500}>
                  <Label basic color='red' pointing='left'>
                    not verify
                  </Label>
                </Transition>
                <Transition visible={verified} animation='scale' duration={500}>
                  <Label basic color='green' pointing='left'>
                    verified
                  </Label>
                </Transition>
                <Label as="a" onClick={this.onShowChangeEmailDialog}>
                  <Icon name='edit' /> เปลี่ยน email
                </Label>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                User name
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field loading={loading} disabled={loading} fluid name="userName" component={RenderTextField} label={false} placeholder={(loading)?"loading...":"กรอก userName"} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                เบอร์โทร
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field  loading={loading} disabled={loading}  fluid name="tel" type="number" component={RenderTextField} label={false} placeholder={(loading)?"loading...":"กรอก เบอร์โทร"} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right" />
              <Grid.Column width="8" textAlign="left">
                <Button loading={saving} color="teal" onClick={handleSubmit(this.onSaveUser)}>
                  บันทึก
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>;

        break;
      case "address":
        content = <Grid style={{ marginTop: "10px" }}>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                ที่อยู่
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {addrInf && addrInf.addr}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                รหัสไปรษ์ณี
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {addrInf && addrInf.postCode}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                จังหวัด
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {addrInf && addrInf.province}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                อำเภอ
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {addrInf && addrInf.district}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                ตำบล
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {addrInf && addrInf.sub_district}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right" />
              <Grid.Column width="8" textAlign="left">
                <Button onClick={this.showEditAddress} color="teal">
                  แก้ไขที่อยู่
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>;
        break;
      case "changePassword":
        content = <Grid style={{ marginTop: "10px" }}>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                รหัสเดิม
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field fluid type="password" name="old_password" component={RenderTextField} label={false} placeholder="กรอก รหัสเดิม" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                รหัสใหม่
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field fluid type="password" name="new_password" component={RenderTextField} label={false} placeholder="กรอก รหัสใหม่" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                ยืนยันรหัส
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field fluid type="password" name="re_password" component={RenderTextField} label={false} placeholder="กรอก ยืนยันรหัส" />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right" />
              <Grid.Column width="8" textAlign="left">
                <Button onClick={handleSubmit(this.onChangePassword)} loading={saving} color="teal">
                  เปลี่ยน
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>;
        break;
      default:
        content = "รอสักครู่..";
        break;
    }

    return (
      <div>
        <Grid container style={{ marginTop: "20px" }}>
          <Grid.Row>
            <Grid.Column width="4" style={{ paddingRight: "3px" }}>
              <Header as="h4" style={{ height: "29px" }}>
                สวัสดี, {userInf.userName}
              </Header>
              <Divider clearing />
              <Menu fluid pointing vertical position="left">
                <Menu.Item name="account" content="บัญชีของฉัน" style={styleItem} active={activeItem === "account"} onClick={this.handleItemClick} />
                <Menu.Item name="changePassword" content="เปลี่ยนรหัสผ่าน" style={styleItem} active={activeItem === "changePassword"} onClick={this.handleItemClick} />
                <Menu.Item name="address" content="ที่อยู่" style={styleItem} active={activeItem === "address"} onClick={this.handleItemClick} />
              </Menu>
            </Grid.Column>
            <Grid.Column width="12">
              <Header as="h2">จัดการข้อมูลบัญชี</Header>
              <Divider clearing />
              <Segment>
                {content}
                <Transition visible={showSuccLabel} animation="scale" duration={500} style={{ marginTop: "10px" }}>
                  <Message positive style={{ position: "absolute", top: "5px", right: "5px" }} size="small">
                    <Icon size="large" name="check circle" />
                    <span>บันทึกสำเร็จ</span>
                  </Message>
                </Transition>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <MuiDialog isOpen={addrForm.isOpen} onCloseDialog={this.onCloseDialog} clickBack={true} size="sm">
          <AddrForm inital={addrInf} onShowMessageSecc={this.showMessageSecc} onCloseDialog={this.onCloseDialog} userInf={userInf} headTitle="แก้ไขที่อยู่" />
        </MuiDialog>
        <MuiDialog isOpen={Dialog.changeEmail.isOpen} onCloseDialog={this.onCloseChangeEmailDialog} clickBack={true} size="sm">
          <ChangeEmailForm  onCloseDialog={this.onCloseChangeEmailDialog} />
        </MuiDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInf:state.User,
    userForm:state.form.userInfo,
    Dialog:state.Dialog
  };
};

export default connect(
  mapStateToProps,
  { change, updateUser,setChangeEmailOpen,loadUserInf }
)(reduxForm({ form: "userInfo", validate })(User));
