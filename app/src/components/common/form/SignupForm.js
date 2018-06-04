import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { 
  withStyles ,
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  Button,
  Grid,
  CircularProgress
} from '@material-ui/core';

// import { 
//   CheckCircle 
// } from '@material-ui/icons';
import * as icons from 'react-icons/lib/md';


import {orange,green} from '@material-ui/core/colors';
import {signUp} from '../../../firebase/auth';
// import {addUser} from '../../../firebase/user';
import { connect } from 'react-redux'
import { addNewUser ,loadUserInf} from '../../../actions/User';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%',
    paddingRight:'15px'
  },
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: '#fff',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: green[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: green[500],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '88%',
    left: '70%',
    marginTop: -12,
    marginLeft: -12,
  }
});

class SignupForm extends React.Component {
 
  constructor(props){
    super(props)
    this.state = {
      userName:'',
      email:'',
      password:'',
      re_password:'',

      req_userName:false,
      req_email:false,
      req_password:false,
      req_re_password:false,

      txt_error_email:"",
      txt_error_repass:"",

      loading: false,
      success: false,

      showMainForm:true
    }
  }

  handleChange = (e) =>  {
    this.setState({ 
      [e.target.name]: e.target.value ,
      ['req_'+e.target.name]:false
    });
  };

  closeDialog  = () =>{
    this.props.onCloseDialog();
  }

  preValidate = () =>{

    let pass = true;

    if(this.state.userName === ''){
      this.setState({req_userName:true});
      pass = false;
    }

    if(this.state.email === ''){
      this.setState({req_email:true});
      pass = false;
    }

    if(this.state.password === ''){
      this.setState({req_password:true});
      pass = false;
    }

    if(this.state.re_password === ''){
      this.setState({req_re_password:true,txt_error_repass:"กรุณากรอก ยืนยันรหัสผ่าน"});
      pass = false;
    }else if(this.state.re_password !== this.state.password){ 
      this.setState({req_re_password:true,txt_error_repass:"รหัสผ่านไม่ตรงกัน "});
      pass = false;
    }

   


    return pass;

  }


  onSignup = () => {

    

    //pre validate
    let prev = this.preValidate();

    //check user name
    
    //--

    if(prev){

      this.props.onSetClickBack(true)
      this.setState({success: false,loading: true,})

      signUp(this.state).then(res => {
        //console.log('add succ',res);

        this.props.addNewUser(Object.assign(this.state, {authId:res.uid}))
        .then(resUser => {

          this.setState({success: true,loading: false,showMainForm:false})
          this.props.onSetClickBack(false)

          //load user data
          //console.log('res.uid',res.uid)
          this.props.loadUserInf(res.uid);
          //--

          setTimeout(()=>{

            this.props.onCloseDialog();
          }, 3000)

        })
        .catch(errUser =>{

          console.log(errUser);
          this.setState({success: true,loading: false})
          this.props.onSetClickBack(false)

        })
        
        // addUser(Object.assign(this.state, {authId:res.uid}))
        // .then(resUser => {


        //   this.setState({success: true,loading: false,showMainForm:false})
        //   this.props.onSetClickBack(false)

        //   setTimeout(()=>{

        //     this.props.onCloseDialog();
        //   }, 3000)

        // })
        // .catch(errUser =>{

        //   this.setState({success: true,loading: false})
        //   this.props.onSetClickBack(false)
        // })
        
      
      }).catch(error =>{
        

        let setMsg = {}
        switch(error.code){
          case 'auth/email-already-in-use':
            setMsg = {
              txt_error_email:'email ถูกใช้สมัครไปแล้ว',
              req_email:true
            }
          break;
          case 'auth/invalid-email':
            setMsg = {
              txt_error_email:'รูปแบบ email ไม่ถูกต้อง',
              req_email:true
            }
          break;
          case 'auth/weak-password':
            setMsg = {
              txt_error_email:'รหัสผ่านต้องมี 6 ตัวอักษรขึ้นไป',
              req_email:true
            }
          break;
          default:
            console.log('error',error)
          break;
        }
  
        this.setState(setMsg);
        this.setState({success: true,loading: false})
        this.props.onSetClickBack(false)
      });
    }
  
    //--
    
    //signup to google auth
    
  }

  render() {
    const { classes } = this.props;
    const {loading,showMainForm} = this.state

    return (
      <div className={classes.container}>
        
        <div style={{display:(showMainForm)?"block":"none"}}>
          <h2 style={{paddingLeft:'8px',marginBottom:"0",color:"#5a5a59"}}>สมัครใหม่</h2>
          <FormControl fullWidth error={this.state.req_email} className={classes.formControl}>
            <InputLabel 
              htmlFor="Email"
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }} >
              Email
            </InputLabel>
            <Input 
              id="Email" 
              name="email" 
              value={this.state.email} 
              onChange={this.handleChange} 
              autoComplete="off"
              classes={{
                underline: classes.cssUnderline,
              }}/>
            <FormHelperText style={{display:(this.state.req_email)?'block':'none'}} >{this.state.txt_error_email}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={this.state.req_userName} className={classes.formControl}>
            <InputLabel 
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              htmlFor="userName" >
              ชื่อผู้ใช้
            </InputLabel>
            <Input 
              classes={{
                underline: classes.cssUnderline,
              }}
              id="userName" 
              name="userName" 
              value={this.state.userName} 
              onChange={this.handleChange} />

            <FormHelperText  style={{display:(this.state.req_userName)?'block':'none'}} >กรุณากรอก ชื่อผู้ใช้</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={this.state.req_password}  className={classes.formControl} aria-describedby="name-helper-text">
            <InputLabel 
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              htmlFor="password" >
              รหัสผ่าน
            </InputLabel>
            <Input 
              classes={{
                underline: classes.cssUnderline,
              }}
              id="password"  
              name="password" 
              type="password" 
              value={this.state.password} 
              onChange={this.handleChange} />
            <FormHelperText  style={{display:(this.state.req_password)?'block':'none'}} >กรุณากรอก รหัสผ่าน</FormHelperText>
          </FormControl>
          <FormControl fullWidth  error={this.state.req_re_password}  className={classes.formControl} aria-describedby="name-helper-text">
            <InputLabel 
              htmlFor="re_password"
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}>
              ยืนยันรหัสผ่าน
            </InputLabel>
            <Input 
              classes={{
                underline: classes.cssUnderline,
              }}
              id="re_password" 
              name="re_password" 
              type="password" 
              value={this.state.re_password} 
              onChange={this.handleChange} />
            <FormHelperText  style={{display:(this.state.req_re_password)?'block':'none'}} >{this.state.txt_error_repass}</FormHelperText>
          </FormControl>
        
          <Grid style={{marginTop:'10px'}} container justify="flex-end">
            <Button 
              disabled={loading}
              variant="raised" 
              onClick={this.onSignup} 
              color="primary" 
              className={classNames(classes.button,classes.cssRoot)}>
              สมัคร
            </Button>
            {loading && <CircularProgress size={28} thickness={5} className={classes.buttonProgress} />}
            <Button variant="flat" onClick={this.closeDialog} color="default" className={classes.button}>
              ยกเลิก
            </Button>
          </Grid>
        </div>
        
        <div style={{display:(!showMainForm)?"block":"none",color:"#00b5ad",width:'100%'}} >
          <Grid  container alignItems="center" justify="center" direction="row" spacing={16}>
            <Grid item><icons.MdCheckCircle size={40}  /></Grid>
            <Grid item> <h2>สมัครสมาชิกสำเร็จ</h2></Grid>
          </Grid>

        </div>
        
      </div>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(()=>({}), { addNewUser,loadUserInf })(SignupForm));