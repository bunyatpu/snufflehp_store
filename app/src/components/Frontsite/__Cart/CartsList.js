import React,{Component} from 'react'
import { 
  Grid, 
  Segment ,
  Image,
  Checkbox,
  Icon
} from 'semantic-ui-react'
import CartQty from './CartQty'
import { getById } from "../../../firebase/products";
import imgWireframe from "./wiref1.png"

class CartsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading:true,
      prodInf:{}
    }
  }

  componentDidMount(){

    const { item } = this.props

    //console.log('item',item)
    getById(item.prodId).then((products)=>{
      //console.log('--->',products.val())
      let prodVal = {}
      
      if(products.val() !== null){
        prodVal = products.val()
        prodVal.prodId = item.prodId
        prodVal.qty = item.qty 
        prodVal.checked = item.checked
      }

      

      this.setState({loading:false,prodInf:prodVal})

      this.props.calTotalPrice(prodVal)

    }).catch((error)=>{
      console.log(error)
    })
  }

  handleChangeQty = (prodId,qty) =>{
    //console.log('handleChangeQty',prodId,qty)
   
    // const { item } = this.props
    // let newState = Object.assign({},this.state.prodInf,item)
    // newState.qty = qty
    // this.props.onHandleChangeQty(newState)
    this.calHandelChangeModel(this.props.onHandleChangeQty,{qty:qty})

    //console.log('handleChangeQty newState=>',newState)
    //this.props.calTotalPrice(newState)
   
  }

  handleChecked =(e,data)=>{
    //console.log('handleChecked e=>',e,data)
    //console.log('handleChecked',data)
    // const { item } = this.props
    // let newState = Object.assign({},this.state.prodInf,item)
    // newState.checked = data.checked;
    // this.props.onHandleToggleChecked(newState)

    this.calHandelChangeModel(this.props.onHandleToggleChecked,{checked:data.checked})
    //this.props.calTotalPrice(newState)
   
  }

  calHandelChangeModel = (calType,params) =>  {

    const { item } = this.props
    let newState = Object.assign({},this.state.prodInf,item,params)

    //console.log('calHandelChangeModel newState',newState)
    calType(newState)

  }

  handleDelete = (e,data) =>{

    //console.log('handleDelete ',data)
    this.props.onDeleteProductList(data)
  }

  render(){

    const { item,mainLoading } = this.props
    const { loading, prodInf } = this.state

    //console.log('render item',item)
    //console.log(prodInf)
    const secSty = {padding:'10px',margin:'5px',border:'1px solid rgba(139, 139, 140, 0.15)'}
    return (
      <Segment style={secSty}> 
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} textAlign="left" >
              <Checkbox prod_id={item.prodId} checked={item.checked} onClick={this.handleChecked} />
            </Grid.Column>
            <Grid.Column width={8}   >

              <Grid >
                <Grid.Row stretched>
                  <Grid.Column verticalAlign="top" width={5} >
                    {
                      true &&
                      <Image 
                        src={imgWireframe} 
                        srcSet={prodInf.thumb_img}
                        size='tiny' 
                        verticalAlign="top" 
                        floated="left"
                        style={{width:'80px',height:'114px'}}
                      />
                    }
                  </Grid.Column>
                  <Grid.Column  verticalAlign="top" width={11} >
                    <div style={{textAlign:'left',fontWeight:'bold'}}>{!loading && prodInf.name}</div>
                    <div style={{textAlign:'left'}}>{!loading && prodInf.desc}</div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Grid.Column>
            <Grid.Column width={2} textAlign="left">
              {!loading && `฿${prodInf.price}`}
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              <CartQty 
                prodId={item.prodId} 
                qty={item.qty} 
                onChangeQty={this.handleChangeQty}
                mainLoading={mainLoading} 
              />
            </Grid.Column>
            <Grid.Column width={2} textAlign="right">
              <Icon name="delete" link onClick={(e) => this.handleDelete(e,Object.assign(item,prodInf))} color="orange" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default CartsList;



// (
//   <Dimmer.Dimmable style={{padding:'0px'}} as={Segment} dimmed={true}>
//                       <Dimmer style={{width:'80px',height:'114px'}} active={true} inverted >
//                         <Loader>Loading</Loader>
//                       </Dimmer>
//                     </Dimmer.Dimmable>
// )