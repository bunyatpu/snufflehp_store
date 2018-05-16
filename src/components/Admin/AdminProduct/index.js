import React, { Component } from 'react';
import { connect } from 'react-redux'
import Search from 'react-icons/lib/md/search';
import { Grid,Segment,Container,Dimmer, Loader } from 'semantic-ui-react'
import {loadProducts,saveProduct} from '../../../actions/product';
import AdminLayout from '../../../components/Admin/AdminLayout'
import ModalPsd from '../../../components/common/Modal'
//import TableProduct from './TableProduct'
import './AdminProduct.css'
import ProductTable from './ProductTable';
//import HeaderProductTable from './HeaderProductTable'
import ProductFormRX from './ProductFormRX'

class AdminProduct extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgFile:'',
      imgUrl:''
    }
  }

	componentWillMount() {
    this.props.loadProducts();
  }

  setImage = (imgObj) => {

    //console.log('setImage main',imgObj);
    
    this.setState({
      imgFile:imgObj.file,
      imgUrl:imgObj.imagePreviewUrl
    });

  }

  submitProductForm = (datas) =>{
    //console.log('submitProductForm,',datas);

    datas.imgFile = this.state.imgFile

    this.props.saveProduct(datas);
    //this.psdModal.onCloseModal();

  }

	render() {

    console.log(this.props.products);

		return (
			<div >
				<AdminLayout>
          <Container style={{width:'98%'}}>
            <Segment.Group>
              <Segment style={{padding:'0px',textAlign:'left'}}>
                <div className="tl-action-bar">
                  <Grid>
                    <Grid.Column floated='left' width={5}>
                      <Search style={{fontSize:'30px'}} />
                      <input type="text" value="" placeholder="ค้นหา" />
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                      <ModalPsd ref={ (modal) => this.psdModal = modal }>
                        <ProductFormRX onSubmit={this.submitProductForm} setImage={this.setImage} {...this.props} />
                      </ModalPsd>
                    </Grid.Column>
                  </Grid>
                </div>
              </Segment>
              <Segment style={{padding:'0px'}}>
                { 
                  (this.props.products.length <= 0) ? 
                  <Dimmer active inverted style={{height:'200px'}}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  :<ProductTable products={this.props.products} />
                }
              </Segment>
            </Segment.Group>
          </Container>
        </AdminLayout>
			</div>
				
		);
	}

}

const mapStateToProps = (state) => {
  return {
    products: state.Products
  }
}


export default connect(mapStateToProps, {loadProducts,saveProduct})(AdminProduct);