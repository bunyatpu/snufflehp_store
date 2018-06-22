import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


const styles = theme => ({
  aa: {
    h2:{
      paddingLeft:'8px'
    }
  },
  fixWidth:{
    maxWidth:"500px"
  },
  fixWidth2:{
    maxWidth:"650px"
  },
  fixPaper:{
    border:"3px solid #00b5ad"
  }
});

class MuiDialog extends React.Component {


  handleClose = () => {
    this.props.onCloseDialog()
  };

  render() {

    let {isOpen,clickBack,size,classes,fixWidth} = this.props;

    //console.log('fixWidth',fixWidth)
    let fixClass = (fixWidth !== undefined) ? {paperWidthSm:classes[fixWidth]}:{}
    //console.log('fixClass',fixClass)
    //border:"

    return (

      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        style={{visibility:"unset"}}
        fullWidth={true}
        maxWidth={size}
        disableBackdropClick={clickBack}
        classes={Object.assign({},fixClass,{paper:classes.fixPaper})}

      >
        <DialogContent >
          {this.props.children}
        </DialogContent>
       
      </Dialog>
 
    );
  }
}

export default withMobileDialog()(withStyles(styles)(MuiDialog));