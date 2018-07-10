import React,{ Component } from "react";
import { Field, reduxForm,SubmissionError } from "redux-form"
import { connect } from 'react-redux'
import { updateEmail } from '../../../firebase/auth';
import { loadUserInf } from "../../../actions/User";

import { 
  Form,
  Grid,
  Header,
  Divider,
  Button,
  Loader
} from 'semantic-ui-react'
import { RenderTextField } from './RenderFields'

const validate = values => {
  //console.log('validate',values);
  const errors = {}

  return errors
}

class ChangeEmailForm extends Component {

  constructor(props){
    super(props)
    this.state = {

      loading: false,
      success: false,
      showMainForm:true

    }
  }

  onSubmit = (value) =>{

    //const { userInf,loadUserInf  }  = this.props;

    this.setState({success: false,loading: true})
    //console.log('value',value);
    return updateEmail(value.newEmail).then((res)=>{
      //console.log('onsubmis updateEmail',res)
      //return loadUserInf(userInf.authId)
      return res
    }).then((res)=>{
      //console.log('onsubmis loadUserInf',res)
      this.setState({success: true,loading: false})
      this.props.onCloseDialog()

    }).catch((err)=>{
      console.log('onsumis error',err);
      this.setState({success: true,loading: false})
      throw new SubmissionError({ newEmail: err.message, _error: err})
    })
  }

  render(){

    const { loading } = this.state;
    const { userInf,handleSubmit } = this.props;

    //console.log(window.location);

    return <div>
      <Header style={{color:"#5a5a59"}} as='h2'>เปลี่ยน Email</Header>
      <Divider />
      <Form  >
        <Grid style={{marginTop:'20px'}}>
          <Grid.Row width="2" verticalAlign="middle">
            <Grid.Column width="5" textAlign="right">
              Email เดิม
            </Grid.Column>
            <Grid.Column width="8" textAlign="left">
              {userInf.email}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row width="2" verticalAlign="middle">
            <Grid.Column width="5" textAlign="right">
              Email ใหม่
            </Grid.Column>
            <Grid.Column width="8" textAlign="left">
              <Field fluid name="newEmail" component={RenderTextField} label={false} placeholder="กรอก email ใหม่" />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row>
            <Grid.Column width={16} style={{textAlign:'right'}}>
            <Loader active={loading} style={{left:'76%'}} />
              <Button 
                disabled={loading}
                onClick={handleSubmit(this.onSubmit)}
                color='teal'>บันทึก</Button>
              <Button onClick={this.props.onCloseDialog} basic >ยกเลิก</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Form>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    userInf: state.User,
  }
}


export default connect(mapStateToProps,{loadUserInf})(reduxForm({form:'changeEmail',validate})(ChangeEmailForm))