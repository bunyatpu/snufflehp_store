import React, { Component } from 'react';
import { Modal,Header } from 'semantic-ui-react'


class ModalError extends Component {

  onCloseModal = () => {
    this.props.onClose()
  }


  render() {

    let {isOpen,message} = this.props;
 
    return (

      <Modal size="small" basic open={isOpen} onClose={this.onCloseModal} >
        <Header icon='browser' color="red" content='Error' />
        <Modal.Content>
          {message}
        </Modal.Content>
          
      </Modal>
     
     
    );
  }
}

export default ModalError;