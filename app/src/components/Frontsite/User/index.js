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
  Transition
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { RenderTextField } from "../../common/form/RenderFields";
import { updateUser } from "../../../actions/User";
import MuiDialog from "../../../components/common/dialog/MuiDialog";
import AddrForm from "../../../components/common/form/AddrForm";

const validate = values => {
  //console.log('validate',values);
  const errors = {};

  if (!values.userName) {
    errors.userName = "ชื่อผู้ใช้ไม่ถูกต้อง";
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
      }
    };
  }

  componentDidMount() {
    const { change, userInf } = this.props;
    change("userName", userInf.userName);
    change("tel", userInf.tel);
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

  onSaveUser = value => {
    //console.log('onSaveUser', value)
    const { updateUser, userInf } = this.props;
    //console.log('onSaveUser', userInf)

    this.setState({
      saving: true
    });

    value.authId = userInf.authId;
    updateUser(userInf.id, value).then(res => {
      this.showMessageSecc();
    });
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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, showSuccLabel, saving, addrForm } = this.state;
    const { userInf, handleSubmit } = this.props;
    const addrInf = userInf.address;
    //console.log('userInf',userInf);
    const styleItem = { textAlign: "right", paddingRight: "30px" };

    let content = "รอสักครู่..";
    switch (activeItem) {
      case "account":
        content = <Grid style={{ marginTop: "10px" }}>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                Email
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                {userInf.email}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                User name
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field fluid name="userName" component={RenderTextField} label={false} placeholder="userName" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width="2" verticalAlign="middle">
              <Grid.Column width="5" textAlign="right">
                เบอร์โทร
              </Grid.Column>
              <Grid.Column width="8" textAlign="left">
                <Field fluid name="tel" type="number" component={RenderTextField} label={false} placeholder="เบอร์โทร" />
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
                <Button loading={saving} color="teal">
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

    return <div>
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
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    userInf: state.User
  };
};

export default connect(
  mapStateToProps,
  { change, updateUser }
)(reduxForm({ form: "userInfo", validate })(User));
