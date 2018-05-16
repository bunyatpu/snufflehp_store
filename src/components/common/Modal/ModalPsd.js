import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from "react-responsive-modal";
import { Button } from 'semantic-ui-react'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './ModalPsd.css';


class ModalPsd extends Component {

  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
    this.props.setInitalReq();
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    let reqState = this.props.reqStatus.req_product_state;
    //console.log('reqState,',reqState);
    


    let content = <h2>No data</h2>;
    //let loadState = 5;
    let styleBox = {width:'771.994px',height:'593px'}
    switch(reqState){
      case 1:
        content = <h2 style={styleBox}>กำลังบันทึก....</h2>;
      break;
      case 2:
        content = <h2 style={styleBox}>บันทึกสำเร็จ</h2>;
      break;
      case 3:
        content = <h2 style={styleBox}>บันทึกไม่สำเร็จ</h2>;
      break;
      default:
       content = (this.props.children) ? 
                    React.cloneElement(this.props.children, {onClose: this.onCloseModal})
                    :'';
      break;
    }

    return (
      <div>
        <Button color="orange" onClick={this.onOpenModal}>เพิ่มสินค้าใหม่</Button>
        <Modal 
            open={open} 
            onClose={this.onCloseModal} 
            classNames={{ overlay: 'custom-overlay',modal:'custom-modal' }}
          >
          {content}
        </Modal>
      </div>
     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reqStatus: state.ReqProcess
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setInitalReq: () => {
      dispatch({
        type:'ADD_PRODUCT_STATE',
        payload:0
      });
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalPsd);