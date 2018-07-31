import React,{Component} from 'react'
import { connect } from 'react-redux'
import { getProductByName } from '../../../actions/product';
import {setSignInOpen} from '../../../actions/DialogAct';
import {addCart,updateCartList} from '../../../actions/CartAct';
import AddrForm from '../../../components/common/form/AddrForm'
import MuiDialog from '../../../components/common/dialog/MuiDialog'
import StatusDialog from '../../../components/common/dialog/StatusDialog'
import ModelError from '../../../components/common/Modal/ModalError'

import { 
  Header, 
  Divider, 
  Grid, 
  Segment ,
  Input,
  Label,
  Button,
  Image,
  Breadcrumb,
  Icon
} from 'semantic-ui-react'



class Product extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      qty:1,
      addrForm:{
        isOpen:false
      },
      isOpenStatus:false,
      bt1Load:false,
      bt2Load:false,
      errorOpen:false,
      msgError:''
    }
  }

  componentDidMount = () => {
    //console.log('match',this.props.match)
    let { productName } = this.props.match.params;

    //console.log('productName',productName)
    this.props.getProductByName(productName);
  }

  onChangeQty = (e) =>{
    this.setState({
      qty:e.target.value
    })
  }

  onUpQty = () => {
    this.setState((prev)=>{
      return {qty:prev.qty+1}
    })
  }

  onDownQty = () => {
    this.setState((prev)=>{
      return {qty:(prev.qty <= 1) ? 1:prev.qty-1}
    })
  }

  onBuy = () =>{

    const {userInf,setSignInOpen} = this.props;
    // console.log('userInf',userInf);
    // console.log('userInf',userInf.address);

    //check login 
    if(userInf.authId === undefined){
      //console.log('no login');
      setSignInOpen(true);
    }else{

      if( !(userInf.address !== undefined && userInf.address.postCode !== undefined) ){
        this.onOpenDialog()
      }

    }

    //check address
    

  }

  onOpenDialog = () => {
    //console.log('onCloseDialog')
    //this.props.setSignUpOpen(false)
    this.setState({
      addrForm:{
        isOpen:true
      }
    })
  }

  onAddtoCart = () => {
    //console.log('onAddtoCart',this.props.userInf);
    const { userInf,pModel,Carts ,updateCartList} = this.props
    const prevProd = Carts.find( item => item.prodId === pModel.prodId )
    

    const data = {
      prodId:pModel.prodId,
      qty:parseInt(this.state.qty,0) +  ( (prevProd === undefined)?0: prevProd.qty),
      checked:true 
    }
    updateCartList(userInf.id,data).then((secc)=>{
      
      this.onShowStatus()
      this.setState({bt1Load:false})

    }).catch((error)=>{
      console.log('error->',error);
      this.setState({errorOpen:true,msgError:error.message})
    })


  }

  gotoCart = () => {

    const { userInf,pModel,Carts,updateCartList } = this.props
    const prevProd = Carts.find( item => item.prodId === pModel.prodId )

    const data = {
      prodId:pModel.prodId,
      qty:parseInt(this.state.qty,0) +  ( (prevProd === undefined)?0: prevProd.qty),
      checked:true 
    }
    updateCartList(userInf.id,data).then((secc)=>{
      
      this.setState({bt2Load:false})
      this.props.historya.push('/cart')

    }).catch((error)=>{
      console.log('error->',error);
      this.setState({errorOpen:true,msgError:error.message})
    })

  }

  onShowStatus = () =>{
    this.setState({isOpenStatus:true})

    setTimeout(() => {
      this.setState({isOpenStatus:false})  
    }, 1000);
  }


  onCloseDialog = () => {
    //console.log('onCloseDialog')
    //this.props.setSignUpOpen(false)
    this.setState({
      addrForm:{
        isOpen:false
      }
    })
  }

  onCloseErrorModal = () =>{
    this.setState({errorOpen:false})
  }

  render(){

    let { qty,addrForm,errorOpen,msgError } = this.state;
    let { pModel ,userInf} = this.props;

    //console.log('cart now=>',Carts);

    //console.log(pModel);
    let submitTypeTxt = "สั่งจองสินค้า"

    return (
      <div>
        <ModelError isOpen={errorOpen} onClose={this.onCloseErrorModal} message={msgError} />
        <StatusDialog isOpen={this.state.isOpenStatus} />
        <Grid container padded="vertically"  >
          <Grid.Row>
            <Grid.Column textAlign="left"  width={16}>
              <Breadcrumb>
                <Breadcrumb.Section link>หน้าหลัก</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link>สินค้าทั้งหมด</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active style={{color:'#757575'}}>{pModel.name}</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} style={{paddingTop:"0px"}}>
            <Grid.Column  width={6} style={{paddingRight:"4px"}}>
              <Segment style={{height:"500px"}} >
                <div>
                  <Image 
                    src={pModel.imgDownloadPath}
                    fluid />
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column  width={10} style={{paddingLeft:"4px"}} >
              <Segment textAlign="left">
                <h2 style={{fontSize:'2rem',fontWeight:"500"}}>{pModel.name}</h2>
                <Header.Subheader>
                {pModel.desc}
                </Header.Subheader>
                <Divider />
                <div>
                  <h2 style={{fontSize:'30px',color:"#f57224"}}>
                    ฿{pModel.price}
                  </h2>
                  <Header.Subheader>
                    {pModel.desc_price}
                  </Header.Subheader>
                </div>
                <Divider />
                <Grid>
                  <Grid.Row verticalAlign="middle"  >
                    <Grid.Column width={2}>
                      จำนวน:
                    </Grid.Column>  
                    <Grid.Column width={2}>
                      <Input labelPosition='right' type='text' placeholder='Amount'>
                        <Label onClick={this.onDownQty} default as="a">
                          <Icon style={{margin:"0px"}} name='minus' />
                        </Label>
                        <input onChange={this.onChangeQty}  value={qty} style={{width:'60px',textAlign:"center"}} />
                        <Label  onClick={this.onUpQty} default as="a">
                          <Icon style={{margin:"0px"}} name='plus' />
                        </Label>
                      </Input>
                    </Grid.Column> 
                  </Grid.Row > 
                </Grid>
                <Divider />
                <Button size="large" loading={this.state.bt1Load} disabled={this.state.bt1Load} color='teal' onClick={this.onAddtoCart}>เพิ่มไปยังรถเข็น</Button>
                <Button size="large" loading={this.state.bt2Load} disabled={this.state.bt2Load}   color='orange' onClick={this.gotoCart} style={{marginLeft:'5px'}}>{submitTypeTxt}</Button>

              </Segment>
            </Grid.Column>
          </Grid.Row>

          <MuiDialog 
            isOpen={addrForm.isOpen}
            onCloseDialog={this.onCloseDialog}
            clickBack={true}
            size="sm"  >
            <AddrForm 
              onCloseDialog={this.onCloseDialog} 
              userInf={userInf}
            />
          </MuiDialog>
        
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    match: state.RouteInfo.match,
    pModel:state.ProductDetail,
    Carts:state.Carts.lists,
    userInf: state.User,
    historya:state.RouteInfo.history
  }
}

export default connect(mapStateToProps,{
  getProductByName,
  setSignInOpen,
  addCart,
  updateCartList
})(Product);