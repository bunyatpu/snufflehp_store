import React,{Component} from 'react'
import { reduxForm,change } from 'redux-form'
import { Grid,Header,Form,Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import AddrField from './AddrField' 
import { updateAddr,loadUserInf } from '../../../actions/User';


const validate = values => {
  //console.log('validate',values);
  const errors = {}
 
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

class AddrForm extends Component {

  constructor(props){
    super(props)

    this.state = {
      saving:false
    }

  }

  onSubmit = (value) =>{

    
    //console.log('onSubmit')
    // console.log('value',value)
    // console.log('userInf',this.props.userInf);

    this.setState({saving:true})

    const { userInf } = this.props;

    //converse addr
    
    if(value.postCode && value.postCode !== undefined){


      const splAddr = value.postCode.split('_')

      let address = {}
      address.addr = value.addr
      address.postCode = splAddr[3];
      address.sub_district = splAddr[0];
      address.district = splAddr[1];
      address.province = splAddr[2];

      this.props.updateAddr(userInf.id,address)
      .then(resUser => {

        //this.setState({success: true,loading: false,showMainForm:false})
        this.setState({saving:false})

        //load user data
        //console.log('addUser succ',resUser)
        this.props.loadUserInf(userInf.authId)
        //this.props.loadUserInf(resUser.uid);
        //--
        this.props.onCloseDialog();
        this.props.onShowMessageSecc();
        // setTimeout(()=>{
        //   //console.log('call onCloseDialog')
        //   this.props.onCloseDialog();
        // }, 500)

      })
      .catch(errUser =>{

        console.log(errUser);
        //this.setState({success: false,loading: false })
        this.setState({saving:false})

      })
    }
   


  }

  render(){

    const { onCloseDialog,handleSubmit,headTitle,inital } = this.props;
    const { saving } = this.state

    //console.log('render allForm',this.props.allForm);

    let headTitleTxt = (headTitle !== undefined) ? <div style={{textAlign:'right'}}>{headTitle}</div>:'เพิ่มที่อยู่'
    return (
      <div style={{width:'99%'}}>
        <Header style={{color:"#5a5a59"}} as='h2'>{headTitleTxt}</Header>
        
        <Form  >
          <Grid>

            <Grid.Row>
              <Grid.Column width={16} style={{textAlign:'right'}}>
                <AddrField  
                  inital={inital}
                  change={this.props.change} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} style={{textAlign:'right'}}>
                <Button 
                  onClick={handleSubmit(this.onSubmit)}
                  loading={saving}
                  disabled={saving}
                  color='teal'>บันทึก</Button>
                <Button onClick={onCloseDialog} basic >ยกเลิก</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form  >
      </div>
    )
    
  }

}

const mapStateToProps = (state) =>{
  return {
    userInf:state.User,
    allForm:state.form
  }
}

export default connect(mapStateToProps, { updateAddr,loadUserInf,change })(reduxForm({form:'addrForm',validate})(AddrForm))