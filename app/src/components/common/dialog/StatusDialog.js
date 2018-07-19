import React,{ Component } from "react";
import { TransitionablePortal,Icon,Segment } from 'semantic-ui-react'

class StatusDialog extends Component {

  render(){

    const style = {
      position:'absolute',
      left:'38%',
      top:'250px',
      zIndex:'100',
      width:'320px',
      background:'rgba(0, 0, 0, 0.67)',
      color:'#fff',
      textAlign:'center'
    }

    const { isOpen } = this.props

    return (
      <TransitionablePortal
        open={isOpen}
  
      >
      <Segment style={style} >
        <p><Icon name='check circle' style={{margin:'0 0em 0 0',fontSize:'50px'}} color="green" size="big"  /></p>
        <div style={{fontSize:'16px'}}>เพิ่มสินค้าลงในรถเข็นแล้ว</div>
      </Segment>
    </TransitionablePortal>
    )
  }
}

export default StatusDialog