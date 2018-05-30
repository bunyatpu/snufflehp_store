import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'


class DialogAny extends Component {

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

    let {isOpen,size} = this.props;

    // const inlineStyle = {
    //   modal : {
    //     marginTop: '0px !important',
    //     marginLeft: 'auto',
    //     marginRight: 'auto'
    //   }
    // };
 
    return (

      <Modal size={size} open={isOpen} onClose={this.onCloseModal} >
          <Modal.Content>
            {this.props.children}
          </Modal.Content>
      </Modal>
     
     
    );
  }
}

export default DialogAny;