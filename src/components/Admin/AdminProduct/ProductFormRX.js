import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form,Grid,Header ,Divider} from 'semantic-ui-react'

import {
  RenderTextField,
  RenderTextAreaField,
  renderDropdownField
} from './RenderFields'
import ImageFormUpload from './ImageFormUpload'


const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = true
  }

  if (!values.desc) {
    errors.desc = true
  }

  if (!values.amount) {
    errors.amount = true
  }

  if (!values.price) {
    errors.price = true
  }

  
  return errors
}

class ProductFormRX extends Component {

 

  saveProduct = (value) =>{

    this.props.handleSubmit(value);
    
  }

  render(){

    let prodStatus = [
      {key:'order',value:'order',text:'เปิดจอง'},
      {key:'sale',value:'sale',text:'เปิดขาย'},
      {key:'out_stock',value:'out_stock',text:'สินค้าหมด'}
    ];
  
    let prodType = [
      {key:'book',value:'book',text:'หนังสือ'},
      {key:'other',value:'other',text:'อื่นๆ'}
    ]

    //const { handleSubmit } = this.props

    return (
      <div>
        <Form onSubmit={ this.saveProduct } >
          <Header as='h2' textAlign="center" >
            บันทึกสินค้า
          </Header>
          <Divider />

          <Grid divided style={{width:'800px'}}>
            <Grid.Row>
              <Grid.Column width={8}>
                <ImageFormUpload {...this.props} />
              </Grid.Column>
              <Grid.Column width={8}>
             
                <Field 
                  name="name" 
                  component={RenderTextField} 
                  label={false}
                  toplabel="ชื่อสินค้า" 
                />
                <Field 
                  name="desc" 
                  component={RenderTextAreaField} 
                  label="คำอธิบาย" 
                />

                <Field 
                  name="amount" 
                  component={RenderTextField} 
                  label={{ basic: true, content: 'ชิ้น' }}
                  toplabel="จำนวนสินค้า" 
                  labelPosition='right'
                />

                <Field 
                  name="price" 
                  component={RenderTextField} 
                  label={{ basic: true, content: 'บาท' }}
                  toplabel="ราคาขาย" 
                  labelPosition='right'
                />

                <Field 
                  name="type_sale" 
                  component={renderDropdownField} 
                  toplabel="สถานะสินค้า" 
                  options={prodStatus}
                />

                <Field 
                  name="product_type" 
                  component={renderDropdownField} 
                  toplabel="ประเภทสินค้า" 
                  options={prodType}
                />

              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} style={{textAlign:'center'}}>
                <Form.Button >บันทึก</Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>


          
        </Form>
      </div>
    );
  }
}

export default reduxForm({form:'product',validate})(ProductFormRX);

