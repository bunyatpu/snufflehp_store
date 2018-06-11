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

import * as icons from 'react-icons/lib/md';
import {orange,green} from '@material-ui/core/colors';
import {signIn} from '../../../firebase/auth';
import { connect } from 'react-redux'
import {loadUserInf} from '../../../actions/User';
import {setSignUpOpen} from '../../../actions/DialogAct';
//import {setSignInOpen} from '../../../actions/DialogAct';
// import cookie from 'react-cookies'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%'
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
    color: orange[500],
    position: 'absolute',
    top: '80%',
    left: '57%',
    marginTop: -12,
    marginLeft: -12,
  }
});

class SignInForm extends React.Component {
 
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:'',

      req_email:false,
      req_password:false,

      txt_error_email:"",
      txt_error_pass:"",

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

    if(this.state.email === ''){
      this.setState({req_email:true});
      pass = false;
    }

    if(this.state.password === ''){
      this.setState({req_password:true,txt_error_pass:"กรุณากรอก รหัสผ่าน"});
      pass = false;
    }


    return pass;

  }

  onSignIn = () => {

    //pre validate
    let prev = this.preValidate();

    if(prev){
      this.props.onSetClickBack(true)
      this.setState({success: false,loading: true,})

      signIn(this.state).then(res => {

        //loadUserInf
        this.props.loadUserInf(res.uid, (userInf)=>{

        })


        this.setState({success: true,loading: false,showMainForm:false})
        this.props.onSetClickBack(false)

        setTimeout(()=>{
          console.log('wait close!')
          this.props.onCloseDialog();
        }, 1000)
        
      
      }).catch(error =>{
        
        //let msg = error.message
        console.log('error',error)
        let setMsg = {}
        switch(error.code){

          case 'auth/user-not-found':
            setMsg = {
              txt_error_email:'email ไม่ถูกต้อง',
              req_email:true
            }
          break;
          case 'auth/wrong-password':
            setMsg = {
              txt_error_pass:'รหัสผ่านไม่ถูกต้อง',
              req_password:true
            }
          break;

          default:
            setMsg = {
              txt_error_email:'email ไม่ถูกต้อง',
              req_email:true
            }
          break;
        }
  
        this.setState(setMsg);
        this.setState({success: true,loading: false})
        this.props.onSetClickBack(false)
      });
    }
  
  }

  onKeyEnter = (e) =>{
    if(e.key === 'Enter'){
      this.onSignIn()
    }
  }

  handelSignup = () => {
    this.closeDialog()
    setTimeout(()=>{

      this.props.setSignUpOpen({isOpen:true,showAddr:true})
    }, 200)
    
  }


  render() {
    const { classes } = this.props;
    const {loading,showMainForm} = this.state

    return (
      <div className={classes.container}>
       
        <div style={{display:(showMainForm)?"block":"none",width:'90%',marginLeft:'15px'}}>
          <div style={{paddingBottom:"50px"}}>
            <div style={{float:"left",fontSize:'24px',paddingLeft:'8px',marginBottom:"0",color:"#5a5a59"}}>เข้าสู่ระบบ</div>
            <div onClick={this.handelSignup} className="setCursor" style={{float:"right",fontSize:'18px',marginBottom:"0",color:"rgb(255, 151, 0)"}}>สมัครใหม่</div>
          </div>
          
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
              autoFocus={true}
              value={this.state.email} 
              onChange={this.handleChange} 
              onKeyPress={this.onKeyEnter}
              classes={{
                underline: classes.cssUnderline,
              }}/>
            <FormHelperText style={{display:(this.state.req_email)?'block':'none'}} >{this.state.txt_error_email}</FormHelperText>
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
              onKeyPress={this.onKeyEnter}
              onChange={this.handleChange} />
            <FormHelperText  style={{display:(this.state.req_password)?'block':'none'}} >{this.state.txt_error_pass}</FormHelperText>
          </FormControl>
          
          <Grid style={{marginTop:'60px'}} container justify="flex-end">
            <Button 
              disabled={loading}
              variant="raised" 
              onClick={this.onSignIn} 
              color="primary" 
              className={classNames(classes.button,classes.cssRoot)}>
              เข้าสู่ระบบ
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
            <Grid item> <h2>เข้าสู่ระบบสำเร็จ</h2></Grid>
          </Grid>

        </div>
       
      </div>
    );
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



//export default withCookies(withStyles(styles)( connect(()=>({}), {loadUserInf})(SignInForm)));
export default withStyles(styles)( connect(()=>({}), {loadUserInf,setSignUpOpen})(SignInForm));