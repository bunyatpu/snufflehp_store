import React,{Component} from 'react'
import { Field, reduxForm,SubmissionError,change } from 'redux-form'

import { 
  Form,
  Grid,
  Header,
  Divider,
  Button,
  Loader
} from 'semantic-ui-react'

import { RenderTextField } from './RenderFields'
import { signUp } from '../../../firebase/auth';
import * as icons from 'react-icons/lib/md';
import { connect } from 'react-redux'
import { addNewUser ,loadUserInf} from '../../../actions/User';
import AddrField from './AddrField' 
// import JQL from 'jqljs'
//const datas = require('../../../data.json');




const validate = values => {
  //console.log('validate',values);
  const errors = {}
  if (!values.email) {
    errors.email = "email ไม่ถูกต้อง"
  }

  if (!values.userName) {
    errors.userName = "ชื่อผู้ใช้ไม่ถูกต้อง"
  }

  if (!values.password) {
    errors.password = "รหัสผ่านไม่ถูกต้อง"
  }

  if (!values.re_password) {
    errors.re_password = "ยืนยันรหัสผ่าน"
  }else if(values.password !== values.re_password){
    errors.re_password = "รหัสผ่านไม่ตรง"
  }

  //--addr
  if (!values.postCode) {
    errors.postCode = "กรณุากรอก รหัสไปรษณีย์"
  }

  if (!values.province) {
    errors.province = "กรณุากรอก จังหวัด"
  }

  if (!values.district) {
    errors.district = "กรณุากรอก อำเภอ"
  }

  if (!values.sub_district) {
    errors.sub_district = "กรณุากรอก ตำบล"
  }

  if (!values.addr) {
    errors.addr = "กรณุากรอก ที่อยู่"
  }

  
  return errors
}

class SignupFullForm extends Component {

  constructor(props){
    super(props)
    this.state = {

      loading: false,
      success: false,
      showMainForm:true

    }
    //console.log('const')
  }

  onSubmit = (value) =>{

    this.props.onSetClickBack(true)
    this.setState({success: false,loading: true})

    // console.log('onSubmit')
    // console.log('value',value)

    //converse addr
    value.address = {}
    if(value.postCode && value.postCode !== undefined){
      const splAddr = value.postCode.split('_')

      
      value.address.addr = value.addr
      value.address.postCode = splAddr[3];
      value.address.sub_district = splAddr[0];
      value.address.district = splAddr[1];
      value.address.province = splAddr[2];
    }
   


    //--

    return signUp(value).then(res => {

        this.props.addNewUser(Object.assign(value, {authId:res.uid}))
        .then(resUser => {

          this.setState({success: true,loading: false,showMainForm:false})
          this.props.onSetClickBack(false)

          //load user data
          //console.log('addUser succ',res.uid)
          this.props.loadUserInf(res.uid);
          //--

          setTimeout(()=>{

            //console.log('call onCloseDialog')
            this.props.onCloseDialog();
          }, 2000)

        })
        .catch(errUser =>{

          console.log(errUser);
          this.setState({success: false,loading: false ,showMainForm:true})
          this.props.onSetClickBack(false)

        })
        

      }).catch(error =>{
        
        console.log('signup error',error);
        // throw new SubmissionError({
        //   userName: 'User does not exist',
        //   _error: 'Login failed!'
        // })
        let errorMsg = {}
        switch(error.code){
          case 'auth/email-already-in-use':

            errorMsg = { email: 'email ถูกใช้สมัครไปแล้ว', _error: 'Login failed!'}

          break;
          case 'auth/invalid-email':

            errorMsg = { userName: 'รูปแบบ email ไม่ถูกต้อง', _error: 'Login failed!'}
          break;
          case 'auth/weak-password':
            errorMsg = { password: 'รหัสผ่านต้องมี 6 ตัวอักษรขึ้นไป', _error: 'Login failed!'}
          break;
          default:
            console.log('error',error)
            errorMsg = { email: 'error', _error: 'Login failed!'}
          break;
        }

        this.setState({success: false,loading: false,showMainForm:true})
        this.props.onSetClickBack(false)

        throw new SubmissionError(errorMsg)

        

      });

  }

  render(){


    let style = {
      row:{
        paddingTop:'7px',
        paddingBottom:'7px'
      },
      row_devide:{
        paddingTop:'0px',
        paddingBottom:'0px'
      }

    }

    let {
      loading,
      showMainForm
    } = this.state;
    let {handleSubmit,onCloseDialog,signUp} = this.props

    //const friendOptions = []
    //console.log('valueSubDistrict',valueSubDistrict)
    //console.log('==>formSignup state ',this.props.formSignup  );

    let addr_form = (!signUp.showAddr)? "":  
        (
          <div>
            <Divider style={{marginTop: '20px', marginBottom: '20px'}} />
            <AddrField change={this.props.change} />
            
          </div>
        );


    return <div>
      <div style={{display:(showMainForm)?"block":"none"}}>
        <Header style={{color:"#5a5a59"}} as='h2'>สมัครใหม่</Header>
        <Divider />
        <Form  >
          <Grid style={{marginTop:'20px'}}>
            <Grid.Row style={style.row}>
              <Grid.Column width={16}>
                <Field 
                    name="email" 
                    component={RenderTextField} 
                    label={false}
                    placeholder="Email"
                  />
              </Grid.Column >
            </Grid.Row>
            <Grid.Row style={style.row}>
              <Grid.Column width={16}>
                <Field 
                    name="userName" 
                    component={RenderTextField} 
                    label={false}
                    placeholder="ชื่อผู้ใช้"
                  />
              </Grid.Column >
            </Grid.Row>
            <Grid.Row style={style.row}>
              <Grid.Column width={16}>
                <Field 
                    name="password" 
                    type="password" 
                    component={RenderTextField} 
                    label={false}
                    placeholder="รหัสผ่าน"
                  />
              </Grid.Column >
            </Grid.Row>
            <Grid.Row  style={style.row}>
              <Grid.Column width={16}>
                <Field 
                    name="re_password" 
                    type="password" 
                    component={RenderTextField} 
                    label={false}
                    placeholder="ยืนยันรหัสผ่าน"
                  />
              </Grid.Column >
            </Grid.Row>
            

          </Grid>

          {addr_form}

          <Grid>
            <Grid.Row>
              <Grid.Column width={16} style={{textAlign:'right'}}>
              <Loader active={loading} style={{left:'76%'}} />
                <Button 
                  disabled={loading}
                  onClick={handleSubmit(this.onSubmit)}
                  color='teal'>บันทึก</Button>
                <Button onClick={onCloseDialog} basic >ยกเลิก</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>


        </Form>
      </div>

      <div style={{display:(!showMainForm)?"block":"none",color:"#00b5ad",width:'100%'}} >
        <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={6} textAlign="right">
              <icons.MdCheckCircle size={40}  />
            </Grid.Column>
            <Grid.Column width={10} textAlign="left">
              <h2>สมัครสมาชิกสำเร็จ</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    signUp:state.Dialog.signUp,
    formSignup:state.form.fullSignup
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onSubmitClick: () => {
//       dispatch(submit('fullSignup'))
//     }
//   }
// }

export default connect(mapStateToProps, { addNewUser,loadUserInf,change })(reduxForm({form:'fullSignup',validate})(SignupFullForm))


/* <Grid.Row style={style.row_devide} >
<Grid.Column width={16}>
  <Divider />
</Grid.Column >
</Grid.Row> */




