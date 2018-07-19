import React,{Component} from 'react'
import { 
  Input,
  Label,
  Icon
} from 'semantic-ui-react'

class CartQty extends Component{

  callChangeParent = (qty) =>{
    let {prodId,onChangeQty} = this.props
    onChangeQty(prodId,qty)
  }

  onHandleChangeQty = (e) =>{
    this.callChangeParent(e.target.value)
  }

  onUpQty = () => {

    const {qty} = this.props
    this.callChangeParent(parseInt(qty,0)+1)
    
  }

  onDownQty = () => {
    const {qty} = this.props

    let qtyNow = parseInt(qty,0)-1
    if(qtyNow < 1){
      qtyNow = 1
    }

    this.callChangeParent(qtyNow)
    
  }


  render(){

    const {qty} = this.props
    
    return <Input labelPosition='right' type='text' placeholder='Amount'>
        <Label onClick={this.onDownQty} default as="a">
          <Icon style={{margin:"0px"}} name='minus' />
        </Label>
        <input onChange={this.onHandleChangeQty}  value={qty} style={{width:'60px',textAlign:"center"}} />
        <Label  onClick={this.onUpQty} default as="a">
          <Icon style={{margin:"0px"}} name='plus' />
        </Label>
    </Input>
  }
}

export default CartQty