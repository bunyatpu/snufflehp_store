import React, { Component } from "react";
import { 
  Grid, 
  Segment ,
  Label,
  Checkbox,
  Header,
  Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
//import InputQty from "../../common/form/InputQty";
import { addCart,manageCart } from '../../../actions/CartAct';
import CartsList from './CartsList'
import NumberFormat from 'react-number-format';
import Shiping from './Shiping'
import MuiDialog from "../../../components/common/dialog/MuiDialog";
import AddrShipping from "../../../components/common/form/AddrShipping";
//CartQty

class Cart extends Component{

  constructor(props){
    super(props)

    let address = (props.userInf.address !== undefined) ? props.userInf.address:{}
    this.state = {
      pLoading:true,
      listInf:[],
      totalProdPrice:0.00,
      transferPrice:0.00,
      sumPrice:0.00,
      address,
      addrForm: {
        isOpen: false
      },
      sumWeight:0,
      defaultWeight:450,
      plusPacking:{
        book:10,
        other:5
      },
      typeCommon:false,
      sumPlusPaking:0.00
      
    }

    //console.log('const',props)
  }

  onHandleChangeQty = (prodId,qty) =>{

    const { userInf } = this.props

    const  model = {
      uid:userInf.id,
      carts:{
        //userId:this.props.userInf.id,
        prodId:prodId,
        qty:qty
      }
    }


    this.props.addCart(model).then((secc)=>{
      
      //console.log('onHandleChangeQty addCart-->',secc)

    }).catch((error)=>{
      console.log('error->',error);
    })

  }

  onHandleToggleChecked = (data) =>{
    //console.log('onHandleToggleChecked',data)
    const { userInf } = this.props

    const  model = {
      uid:userInf.id,
      carts:{
        //userId:this.props.userInf.id,
        prodId:data.prod_id,
        checked:data.checked
      }
    }


    this.props.manageCart(model).then((secc)=>{
      
      //console.log('onHandleToggleChecked addCart-->',secc)

    }).catch((error)=>{
      console.log('error->',error);
    })
  }

  calculateTotalPrice = (pInfo) => {
    
    //console.log('pInfo',pInfo)

    let { listInf,plusPacking } = this.state

    const findIndex = listInf.findIndex(i => i.prodId === pInfo.prodId)
    //console.log('findIndex',findIndex)
    if(findIndex < 0){
      if(pInfo.checked){
        listInf.push(pInfo)
      }
      
    }else{
      if(pInfo.checked){
        listInf[findIndex] = {...listInf[findIndex],...pInfo}
      }else{
        //console.log('slice')
        listInf.splice(findIndex,1)
      }
      
    }

    //let sumPrice = listInf.reduce( (acc, i) => acc + (i.qty * i.price),0)
    let sumPrice = 0.00
    let sumWeight = 0
    let sumPlusPaking = 0.00

    listInf.forEach((i)=>{
      sumPrice += (i.price * i.qty)
      sumWeight += (i.qty * this.state.defaultWeight)
      
      if( (i.qty - 1) > 0 && i.product_type !== undefined){
        sumPlusPaking += ( (i.qty - 1) * plusPacking[i.product_type] )
      }

    })

    this.setState({
      totalProdPrice:sumPrice,
      sumWeight,
      sumPlusPaking
    })

    console.log('sumPrice',sumPrice,'sumWeight',sumWeight)

  }

  handleSelShipping = (data) => {
    console.log('handleSelShipping',data)
    this.setState({transferPrice:data.price})
  }

  onCloseDialog = () => {
    //console.log('onCloseDialog')
    //this.props.setSignUpOpen(false)
    this.setState({
      addrForm: {
        isOpen: false
      }
    });
  }

  showMessageSecc = () => {

  }

  showEditAddress = () => {
    //console.log('onCloseDialog')
    //this.props.setSignUpOpen(false)
    this.setState({
      addrForm: {
        isOpen: true
      }
    })
  }

  onSummitAddr = (data) =>{
    console.log('onSummitAddr',data)
    this.setState({address:data})
    this.onCloseDialog()
  }


  render(){

    //let colSty = {}
    const secSty = {padding:'10px',margin:'5px',border:'1px solid rgba(139, 139, 140, 0.15)'}
    const sumSty = {padding:'2px',margin:'2px'}
    const sumLine = {marginTop:'10px'}
    const { userInf,Carts } = this.props
    const { address,addrForm,sumWeight,sumPlusPaking } = this.state
    //const addrInf = userInf.address;

    //console.log('userInf',userInf);

    let addressTxt = address.addr 
          +' ตำบล'+address.sub_district
          +' อำเภอ'+address.district
          +' จังหวัด'+address.province
          +' '+address.postCode

  

    let items = Carts.map((item,i)=>{
      return <CartsList 
          key={i} 
          item={item} 
          onHandleChangeQty={this.onHandleChangeQty} 
          onHandleToggleChecked={this.onHandleToggleChecked}
          calTotalPrice={this.calculateTotalPrice}
        />
    })

    return <div>
      <MuiDialog isOpen={addrForm.isOpen} onCloseDialog={this.onCloseDialog} clickBack={true} size="sm">
          <AddrShipping 
            inital={address} 
            onShowMessageSecc={this.showMessageSecc} 
            onSummitAddr={this.onSummitAddr}
            onCloseDialog={this.onCloseDialog} 
            userInf={userInf} 
            headTitle="แก้ไขที่อยู่" 
          />
      </MuiDialog>
      <Grid container padded="vertically"  >
        <Grid.Row  >
          <Grid.Column width={10} style={{paddingRight:"2px"}} >
            <Segment secondary style={Object.assign(secSty,{border:'1px solid rgba(172, 172, 173, 0.15)',boxShadow:'none'})}> 
              <Grid>
                <Grid.Row>
                  <Grid.Column width={1} textAlign="left" >
                    <Checkbox />
                  </Grid.Column>
                  <Grid.Column width={9} textAlign="left">
                    เลือกทั้งหมด
                  </Grid.Column>
                  <Grid.Column width={2} textAlign="left">
                    ราคา
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    จำนวน
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            { items }
           
          </Grid.Column>
          <Grid.Column width={6} style={{paddingLeft:"2px"}}>
            <Segment style={secSty}> 
              <Grid >
                <Grid.Row >
                  <Grid.Column width={16} textAlign="left">

                    <Header as='h5'  block color='grey'>
                      <Header.Content style={{width:'100%'}}>
                        ที่อยู่ในการจัดส่ง
                        <Label onClick={this.showEditAddress} as="a" size="tiny" color="yellow" style={{float:'right'}} >เปลี่ยนที่อยู่</Label>
                      </Header.Content>
                    </Header>
                    { addressTxt }

                    <Header as='h5'  block color='grey' style={{marginTop:'40px'}} >
                      <Header.Content style={{width:'100%'}}>
                        ตัวเลือกในการจัดส่ง
                      </Header.Content>
                    </Header>
                    <Shiping 
                      weight={sumWeight} 
                      handleSelShipping={this.handleSelShipping} 
                      sumPlusPaking={sumPlusPaking}
                    />

                    <Header as='h5'  block color='grey' style={{marginTop:'40px'}} >
                      <Header.Content style={{width:'100%'}}>
                        สรุปรายการสั่งซื้อ
                      </Header.Content>
                    </Header>
                    <Grid style={{marginLeft:'10px',marginRight:'10px'}}>
                      <Grid.Row style={sumSty}>
                        <Grid.Column width={8}>ราคาสินค้ารวม</Grid.Column>
                        <Grid.Column textAlign="right" width={6}>
                          <NumberFormat 
                            thousandSeparator={true} 
                            value={parseFloat(this.state.totalProdPrice)} 
                            displayType='text'
                            decimalScale={2}
                          />
                        </Grid.Column>
                        <Grid.Column width={2}>บาท</Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={sumSty}>
                        <Grid.Column width={8}>ค่าจัดส่ง</Grid.Column>
                        <Grid.Column textAlign="right"width={6}>
                          <NumberFormat 
                              thousandSeparator={true} 
                              value={parseFloat(this.state.transferPrice)} 
                              displayType='text'
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>บาท</Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={sumSty} >
                        <Grid.Column style={sumLine}  width={8}>รวม</Grid.Column>
                        <Grid.Column 
                          style={Object.assign({},sumLine,{fontWeight:'bold',fontSize:'1.3rem',color:'orange'})} 
                          textAlign="right"width={6}>
              
                          <NumberFormat 
                              thousandSeparator={true} 
                              value={parseFloat(this.state.totalProdPrice) + parseFloat(this.state.transferPrice)} 
                              displayType='text'
                            />
                        </Grid.Column>
                        <Grid.Column style={sumLine} width={2}>บาท</Grid.Column>
                      </Grid.Row>
                    </Grid>

                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Button fluid color="teal">ชำระเงิน</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  }
}



const mapStateToProps = (state) => {
  return {
    userInf: state.User,
    Carts:state.Carts.lists
  }
}

export default connect(mapStateToProps,{ addCart,manageCart })(Cart);
