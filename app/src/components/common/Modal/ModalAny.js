import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './ModalPsd.css';


class ModalAny extends Component {

  constructor(props){
    super(props)
    this.state = {
      isOpen:false
    }
  }

  onCloseModal = () => {
    this.props.onCloseDialog()
  }


  render() {

    let {isOpen} = this.props;

 
    return (

      <Modal 
          open={isOpen} 
          onClose={this.onCloseModal} 
          classNames={{ overlay: 'custom-overlay',modal:'custom-modal' }}
        >
        {this.props.children}
      </Modal>
     
     
    );
  }
}


export default ModalAny;