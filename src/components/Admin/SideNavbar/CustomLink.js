import React, { Component } from 'react';
import './react-metismenu-standart.css';
import { Link } from 'react-router-dom';


export default class CustomLink extends Component {


  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
   // console.log('is click');
    
    if (this.props.hasSubMenu){
      this.props.toggleSubMenu(e);
    }else {
      
      this.props.activateMe({
        newLocation: this.props.to,
        selectedMenuLabel: this.props.label,
      });

     
    }
  }

  render() {

 
    let currentCrl = window.location.pathname;
    //let pathNow = this.props.location.pathname;
    let claLink = "metismenu-link";
    //claLink += (this.props.active) ? ' active':'';

    claLink += (currentCrl === this.props.to ) ? ' active':'';
    

    return (

        <Link to={this.props.to} onClick={this.onClick} className={claLink}>
          {this.props.children}
        </Link>
 
    );
  }

}

