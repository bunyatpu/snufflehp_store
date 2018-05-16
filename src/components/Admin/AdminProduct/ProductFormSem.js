import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form,Grid,Image,Input,TextArea,Header ,Divider,Dropdown} from 'semantic-ui-react'
import wfPath from './images/wireframe.png'
import {saveProduct} from 'actions/product'




class ProductFormSem extends Component {

  constructor(props){
    super(props);
    this.state =  {
      name: '',
      desc: '',
      amount:'',
      price:'',
      type_sale:'order',
      product_type:'book'
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

  };


  handleDropdown = (e,{name,value})=>{
    this.setState({
      [name]: value
    });
    //console.log(value);
    // console.log(this.state);
  }

  saveProduct = (event) =>{

    // console.log(event);
    // console.log(this.state);
    this.props.saveProduct(this.state);
    this.props.onClose();

  }
  
  render() {

    //console.log(this.props);

    let prodStatus = [
        {key:'order',value:'order',text:'เปิดจอง'},
        {key:'sale',value:'sale',text:'เปิดขาย'},
        {key:'out_stock',value:'out_stock',text:'สินค้าหมด'}
      ];
    
    let prodType = [
      {key:'book',value:'book',text:'หนังสือ'},
      {key:'other',value:'other',text:'อื่นๆ'}
    ]

    return (
      <div>
        <Form >
          <Header as='h2' textAlign="center" >
            บันทึกสินค้า
          </Header>
          <Divider />

          <Grid divided style={{width:'800px'}}>
            <Grid.Row>
              <Grid.Column width={8}>
                <Image src={wfPath} fluid />
                <Form.Input 
                  fluid
                   type="file"
                 />

              </Grid.Column>
              <Grid.Column width={8}>
             
                <Form.Input 
                   
                  label='ชื่อสินค้า' 
                  onChange={this.handleChange('name')} 
                  value={this.state.name} 
                  placeholder='ชื่อสินค้า' 
                />
              
                <Form.Field>
                  <label>คำอธิบาย</label>
                  <TextArea 
                    onChange={this.handleChange('desc')} 
                    value={this.state.desc} 
                    autoHeight 
                    placeholder='คำอธิบาย' />
                </Form.Field>

                <Form.Field>
                  <label>จำนวนสินค้า</label>
                  <Input
                    label={{ basic: true, content: 'ชิ้น' }}
                    onChange={this.handleChange('amount')} 
                    value={this.state.amount} 
                    labelPosition='right'
                    placeholder='จำนวนสินค้า'
                  />
                </Form.Field>
                <Form.Field>
                  <label>ราคาขาย</label>
                  <Input
                    label={{ basic: true, content: 'บาท' }}
                    onChange={this.handleChange('price')} 
                    value={this.state.price} 
                    labelPosition='right'
                    placeholder='ราคาขาย'
                  />
                </Form.Field>
                <Form.Field>
                  <label>สถานะสินค้า</label>
                 
                  <Dropdown
                    selection
                    name='type_sale'
                    options={prodStatus}
                    placeholder='สถานะสินค้า'
                    value={this.state.type_sale}
                    onChange={this.handleDropdown}
                  />
                </Form.Field>
                <Form.Field>
                  <label>ประเภทสินค้า</label>
 

                  <Dropdown
                    selection
                    name='product_type'
                    options={prodType}
                    placeholder='ประเภทสินค้า'
                    value={this.state.product_type}
                    onChange={this.handleDropdown} 
                  />

                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} style={{textAlign:'center'}}>
                <Form.Button onClick={this.saveProduct}>บันทึก</Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>


          
        </Form>
      </div>
    )
  }
}

export default connect( ()=>({}), {saveProduct})(ProductFormSem);