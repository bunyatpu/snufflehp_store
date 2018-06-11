import React,{Component} from 'react'
import { connect } from 'react-redux'
import { getProductByName } from '../../../actions/product';
import {setSignInOpen} from '../../../actions/DialogAct';
import { 
  Header, 
  Divider, 
  Grid, 
  Segment ,
  Input,
  Label,
  Button,
  Image
} from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'



class Product extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      qty:1
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
    console.log('userInf',userInf);
    //check login 
    if(userInf.authId === undefined){
      console.log('no login');
      setSignInOpen(true);
    }else{

    }

    //check address

  }



  render(){

    let { qty } = this.state;
    let { pModel } = this.props;

    //console.log(pModel);
    let submitTypeTxt = "สั่งจองสินค้า"

    return (
      <Grid container padded="vertically"  >
        <Grid.Row   columns={2}>
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
              <Button size="large" color='teal'>เพิ่มไปยังรถเข็น</Button>
              <Button size="large" color='orange' onClick={this.onBuy} style={{marginLeft:'5px'}}>{submitTypeTxt}</Button>

            </Segment>
          </Grid.Column>
        </Grid.Row>
       
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    match: state.RouteInfo.match,
    pModel:state.ProductDetail,
    userInf: state.User
  }
}

export default connect(mapStateToProps,{getProductByName,setSignInOpen})(Product);