import React, { Component }  from 'react';
//import {Provider} from 'react-redux'
//import { BrowserRouter } from 'react-router-dom';
import App from './App';

import {init as firebaseInit} from './firebase/firebase'
//import configureStore from './config/configStore'

firebaseInit()
//let store = configureStore()

class AppSsr extends Component{

  render(){
    
    return (
      <App />
    )
  }
}

export default AppSsr;
