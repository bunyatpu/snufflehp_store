import React, { Component } from 'react';
import {Card,Image,Loader} from 'semantic-ui-react';
//import firebase from 'firebase';
//import 'firebase/storage' // <- add
import iconLoad from '../../../images/30.gif'

export default class ProductCard extends Component {


  constructor () {
    super()
    this.state = {
      imgPath: iconLoad,
      loadStatus:true,
      imgShow:"none"
    }

  }

  componentWillMount(){
    //console.log('componentWillMount:',this.props.data);
    //this.getImage(this.props.data.imgPath);
  }


  getImage (path) {

    // firebase.storage().ref().child(path).getDownloadURL().then((url) => {
    
    //   this.setState({
    //     imgPath:url,
    //     loadStatus:false,
    //     imgShow:"block"
    //   })
    // })
  }

	render() {

    //console.log('data:',this.props.data);
    let data = this.props.data;
    //this.getImage(data.imgPath);

    //let imgUrl = data.imgPath && firebase.storage().ref().child(data.imgPath);
    //data.imgPath && firebase.storage().ref().child(data.imgPath);

    //console.log('imgUrl:',this.state.imgPath);

    let hImg = '314.062px';//'314.062px';
    

		return (


        <Card href='#'>

          
          <Image  src={ data.imgDownloadPath }   style={{height:hImg}} />
          
          <Card.Content>
            <Card.Header>
              {data.name}
            </Card.Header>
            <Card.Meta>
              <span>
              {data.desc}
              </span>
            </Card.Meta>
            <Card.Description>
              ราคาxaa ฿{data.price}
            </Card.Description>
          </Card.Content>
        </Card>
        
      
		);
	}

}

/* <Image src="https://firebasestorage.googleapis.com/v0/b/snufflehp-v3.appspot.com/o/img_products%2F1-168.jpg?alt=media&token=142d7a46-7c9c-4c6a-badb-84b784f34c1f" style={{width:'100%'}} /> */
          