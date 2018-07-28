import React, { Component } from "react";
import { 
  Grid, 
  Segment ,
  Label,
  Checkbox,
  Header,
  Button,
  Transition,
  Confirm
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
      sumPlusPaking:0.00,
      initPriceShiping:{
        normal:20,
        regis:40,
        ems:60
      },
      priceShiping:{
        normal:0,
        regis:0,
        ems:0
      },
      selShiping:'',
      packingAdd:{
        dicutBox:false,
        bubble:false,
        dicutBoxPrice:16,
        bubblePrice:10
      },
      sumPackAdd:0.00,
      showComfirmPage:false,
      openDelConfirm:false,
      prepareDel:{}
      
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

  onDeleteProductList = (prodInf) =>{

    console.log('onDeleteProductList prodInf=>',prodInf)

    this.handleOpenProdDelete(prodInf)

    // const { userInf } = this.props

    // const  model = {
    //   uid:userInf.id,
    //   carts:{
    //     prodId:prodInf.prodId
    //   }
    // }

    // this.props.manageCart(model,true).then((secc)=>{
      
    //   console.log('onDeleteProductList-->',secc)

    // }).catch((error)=>{
    //   console.log('error->',error);
    // })

  }

  calTotalPrice = (pInfo) => {
    
    //console.log('pInfo',pInfo)

    let { 
      listInf,
      plusPacking,
      initPriceShiping,
      selShiping 
    } = this.state

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

    let calShip = {
      normal:initPriceShiping.normal + sumPlusPaking,
      regis:initPriceShiping.regis + sumPlusPaking,
      ems:initPriceShiping.ems + sumPlusPaking
    }

    let newSelShiping = selShiping

    if(newSelShiping !== 'ems'){

      newSelShiping = (sumWeight > 4000) ? 'normal':'regis'
      
    }

    let transferPrice = (calShip[newSelShiping] !== undefined)? calShip[newSelShiping]:0.00;

    this.setState({
      totalProdPrice:sumPrice,
      sumWeight,
      sumPlusPaking,
      priceShiping:calShip,
      transferPrice,
      selShiping:newSelShiping
    })

    //console.log('sumPrice',sumPrice,'sumWeight',sumWeight, 'sumPlusPaking',sumPlusPaking)

  }

  handleSelShipping = (data) => {
    //console.log('handleSelShipping',data)
    let transferPrice = (this.state.priceShiping[data.selShiping] !== undefined)? this.state.priceShiping[data.selShiping]:0.00;

    this.setState({
      selShiping:data.selShiping,
      transferPrice
    })


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

  onShowConfirmPage = () =>{
    this.setState({showComfirmPage:true})
  }

  onShowPaymentPage = () =>{
    this.setState({showComfirmPage:false})
  }

  onToggleShipAdd = (e,data) =>{
    //console.log(e,data)
    // //sumPackAdd
    let addNow = this.state.transferPrice

    
    if(data.checked){
      //sumPackAdd
      addNow += this.state.packingAdd[data.name+'Price']
    }else{
      addNow -= this.state.packingAdd[data.name+'Price']
    }

    //console.log(data.name+'Price','addNow',addNow)

    this.setState({
      transferPrice:addNow
    })


  }

  handleDelProdCancel = () =>{
    this.setState({openDelConfirm:false})
  }

  handleOpenProdDelete = (prodInf) =>{
    this.setState({
      openDelConfirm:true,
      prepareDel:prodInf
    })
  }

  handleDelProdConfirm = () =>{
    //this.setState({openDelConfirm:false})

    const { userInf } = this.props
    const { prepareDel } = this.state

    const  model = {
      uid:userInf.id,
      carts:{
        prodId:prepareDel.prodId
      }
    }

    this.props.manageCart(model,true).then((secc)=>{
      
      console.log('onDeleteProductList-->',secc)
      this.setState({
        openDelConfirm:false,
        prepareDel:{}
      })

    }).catch((error)=>{
      console.log('error->',error);
    })
  }


  render(){

    //let colSty = {}
    const secSty = {padding:'10px',margin:'5px',border:'1px solid rgba(139, 139, 140, 0.15)'}
    const sumSty = {padding:'2px',margin:'2px'}
    const sumLine = {marginTop:'10px'}
    const { userInf,Carts } = this.props
    const { 
      address,
      addrForm,
      sumWeight,
      sumPlusPaking,
      priceShiping,
      selShiping,
      showComfirmPage,
      openDelConfirm
    } = this.state
    //const addrInf = userInf.address;

    //console.log('userInf',userInf);

    let addressTxt = address.addr 
          +' ตำบล'+address.sub_district
          +' อำเภอ'+address.district
          +' จังหวัด'+address.province
          +' '+address.postCode

  
    //console.log('render Carts:',Carts);

    let items = Carts.map((item,i)=>{
      return <CartsList 
          key={item.prodId} 
          item={item} 
          onHandleChangeQty={this.onHandleChangeQty} 
          onHandleToggleChecked={this.onHandleToggleChecked}
          calTotalPrice={this.calTotalPrice}
          onDeleteProductList = {this.onDeleteProductList}
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
      <Confirm 
        open={openDelConfirm} 
        onCancel={this.handleDelProdCancel} 
        onConfirm={this.handleDelProdConfirm} 
        content='ต้องการลบรายการนี้หรือไม่'
      />
      
      <Transition transitionOnMount={true} visible={!showComfirmPage} animation='fade' duration={500}>
        <Grid container padded="vertically"  >
          <Grid.Row  >
            <Grid.Column width={10} style={{paddingRight:"2px"}} >
              <Segment secondary style={Object.assign(secSty,{border:'1px solid rgba(172, 172, 173, 0.15)',boxShadow:'none'})}> 
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={1} textAlign="left" >
                      <Checkbox />
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="left">
                      เลือกทั้งหมด
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="left">
                      ราคา
                    </Grid.Column>
                    <Grid.Column width={5} textAlign="left">
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
                        priceShiping={priceShiping}
                        selShiping={selShiping}
                      />
                      
                      <Grid style={{marginLeft:'0px',marginRight:'10px',marginTop:'10px'}}>
                        <Grid.Row style={sumSty}>
                          <Grid.Column width={16}>
                            <Checkbox 
                              name="dicutBox"
                              
                              label={<label>เพิ่ม กล่องไดคัทขนาด ค. ของไปรษณีย์ 16 บาท</label>} 
                              onChange={this.onToggleShipAdd}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={sumSty}>
                          <Grid.Column width={16}>
                            <Checkbox 
                              name="bubble"
                              
                              label={<label>เพิ่ม บั๊บเบิ้ลกันกระแทก 10 บาท</label>} 
                              onChange={this.onToggleShipAdd}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

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
                      <Button fluid color="teal" onClick={this.onShowConfirmPage} >ชำระเงิน</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Transition>
    
    
      {
        showComfirmPage && 
        <Segment style={Object.assign({},secSty,{
          width:'600px',
          marginLeft:'auto',
          marginRight:'auto',
          marginTop:'20px'
          })}> 
          <Grid >
            <Grid.Row >
              <Grid.Column width={16} textAlign="left">

                <Header as='h5'  block color='grey'>
                  <Header.Content style={{width:'100%'}}>
                    ที่อยู่ในการจัดส่ง
                  </Header.Content>
                </Header>
                { addressTxt }

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
                <Button fluid color="teal"  >ยืนยันการชำระเงิน</Button>
                <Button fluid style={{marginTop:'5px'}} onClick={this.onShowPaymentPage} content='กลับหน้าชำระเงิน' basic />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      }
  
       
      
     

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
