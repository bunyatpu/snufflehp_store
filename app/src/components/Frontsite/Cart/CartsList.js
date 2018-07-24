import React,{Component} from 'react'
import { 
  Grid, 
  Segment ,
  Image,
  Checkbox
} from 'semantic-ui-react'
import CartQty from './CartQty'
import { getById } from "../../../firebase/products";

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

  // componentDidUpdate(){
  //   const { prodInf } = this.state
  //   this.props.calTotalPrice(prodInf)
  // }

  handleChangeQty = (prodId,qty) =>{
    //console.log('handleChangeQty',prodId,qty)
    this.props.onHandleChangeQty(prodId,qty)


   
    let newState = Object.assign({},this.state.prodInf)
    newState.qty = qty

    //console.log('handleChangeQty newState=>',newState)
    this.props.calTotalPrice(newState)
   
  }

  handleChecked =(e,data)=>{
    //console.log('handleChecked e=>',e,data)
    //console.log('handleChecked',data)
    this.props.onHandleToggleChecked(data)

    let newState = Object.assign({},this.state.prodInf)
    newState.checked = data.checked;
    this.props.calTotalPrice(newState)
   
  }

  // calTotalPrice = () =>{



   
  // }



  render(){

    const { item } = this.props
    const { loading, prodInf } = this.state

    //console.log(prodInf)
    const secSty = {padding:'10px',margin:'5px',border:'1px solid rgba(139, 139, 140, 0.15)'}
    return (
      <Segment style={secSty}> 
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} textAlign="left" >
              <Checkbox prod_id={item.prodId} checked={item.checked} onClick={this.handleChecked} />
            </Grid.Column>
            <Grid.Column width={9}   >
              <Image 
                src={prodInf.thumb_img} 
                size='tiny' 
                verticalAlign="top" 
                floated="left"
                />
              <div style={{textAlign:'left',fontWeight:'bold'}}>{!loading && prodInf.name}</div>
              <div style={{textAlign:'left'}}>{!loading && prodInf.desc}</div>
            </Grid.Column>
            <Grid.Column width={2} textAlign="left">
              {!loading && `฿${prodInf.price}`}
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
              <CartQty prodId={item.prodId} qty={item.qty} onChangeQty={this.handleChangeQty} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default CartsList;