import React,{Component} from 'react'
import { 
  Grid, 
  Segment ,
  Image,
  Checkbox,
  Icon
} from 'semantic-ui-react'
import CartQty from './CartQty'
//import { getById } from "../../../firebase/products";
import { loadProdInf,updateCartList } from "../../../actions/CartAct";
import imgWireframe from "./wiref1.png"
import { connect } from 'react-redux'

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
    //console.log('componentDidMount',item)
    this.props.loadProdInf(item.prodId)

  }

  handleChangeQty = (prodId,qty) =>{

    //this.calHandelChangeModel(this.props.onHandleChangeQty,{qty:qty})
    const { userInf,updateCartList } = this.props
    //console.log('userInf',userInf)
    const data = {
      prodId,
      qty
    }

    updateCartList(userInf.id,data)

  }

  handleChecked =(e,data)=>{

    //this.calHandelChangeModel(this.props.onHandleToggleChecked,{checked:data.checked})
    const { userInf,updateCartList } = this.props
    const model = {
      prodId:data.prod_id,
      checked:data.checked
    }
   
    updateCartList(userInf.id,model)
  }

  calHandelChangeModel = (calType,params) =>  {

    const { item } = this.props
    let newState = Object.assign({},this.state.prodInf,item,params)

    //console.log('calHandelChangeModel newState',newState)
    calType(newState)

  }

  handleDelete = (e,data) =>{
    //const { userInf,deleteCartList } =  this.props
    this.props.handleOpenProdDelete(data)
    // const model = {
    //   prodId:data.prodId
    // }
    // deleteCartList(userInf.id,model)
  }

  render(){

    const { item } = this.props
    //const { loading } = this.state
    //console.log('render',item)

    const prodInf = item.prodInf
    const loading = (prodInf === undefined) ? true:false
  
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
                        srcSet={ (loading) ? '':prodInf.thumb_img }
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
//loadProdInf

const mapStateToProps = (state) => {
  return {
    userInf: state.User
  }
}
export default connect(mapStateToProps,{
  loadProdInf,
  updateCartList
})(CartsList);



// (
//   <Dimmer.Dimmable style={{padding:'0px'}} as={Segment} dimmed={true}>
//                       <Dimmer style={{width:'80px',height:'114px'}} active={true} inverted >
//                         <Loader>Loading</Loader>
//                       </Dimmer>
//                     </Dimmer.Dimmable>
// )