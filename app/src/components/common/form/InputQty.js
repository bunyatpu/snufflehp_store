import React,{Component} from 'react'
import { 
  Input,
  Label,
  Icon
} from 'semantic-ui-react'

class InputQty extends Component{

  constructor(props){
    super(props);
    this.state ={
      qty:props.qty || 0
    }
  }



  componentDidUpdate(){
    this.callChangeParent()
  }

  callChangeParent = () =>{
    let {prodId,onChangeQty} = this.props
    //console.log('callChangeParent',this.props);
    onChangeQty(prodId,this.state.qty)
  }

  onHandleChangeQty = (e) =>{
    this.setState({
      qty:e.target.value
    })
   
  }

  onUpQty = () => {
    this.setState((prev)=>{
      return {qty:parseInt(prev.qty,0)+1}
    })
    
  }

  onDownQty = () => {
    this.setState((prev)=>{
      return {qty:(parseInt(prev.qty,0) <= 1) ? 1:parseInt(prev.qty,0)-1}
    })
    
  }


  render(){


    
    return <Input labelPosition='right' type='text' placeholder='Amount'>
        <Label onClick={this.onDownQty} default as="a">
          <Icon style={{margin:"0px"}} name='minus' />
        </Label>
        <input onChange={this.onHandleChangeQty}  value={this.state.qty} style={{width:'60px',textAlign:"center"}} />
        <Label  onClick={this.onUpQty} default as="a">
          <Icon style={{margin:"0px"}} name='plus' />
        </Label>
    </Input>
  }
}

export default InputQty