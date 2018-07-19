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
      }

      this.setState({loading:false,prodInf:prodVal})

    }).catch((error)=>{
      console.log(error)
    })
  }

  handleChangeQty = (prodId,qty) =>{
    //console.log('handleChangeQty',prodId,qty)
    this.props.onHandleChangeQty(prodId,qty)
  }

  render(){
    const {item} = this.props
    const { loading,prodInf } = this.state
    const secSty = {padding:'10px',margin:'5px',border:'1px solid rgba(139, 139, 140, 0.15)'}
    return (
      <Segment style={secSty}> 
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} textAlign="left" >
              <Checkbox />
            </Grid.Column>
            <Grid.Column width={9}   >
              <Image 
                src={'https://firebasestorage.googleapis.com/v0/b/snufflehp-v3.appspot.com/o/img_products%2Fm.jpg?alt=media&token=959d9bde-488b-40b7-a19a-c56ed2c244b0'} 
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