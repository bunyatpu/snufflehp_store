import React, { Component } from 'react';
import { connect } from 'react-redux'
import {setUserInf} from './actions/User';
import { Switch, Route } from 'react-router';
import Frontsite from './components/Frontsite'
import { withCookies } from 'react-cookie';
//import Admin from './components/Admin'
import './App.css';
//import 'librarys/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {

  //constructor(props){
    //super(props);
    // let userInfo = localStorage.getItem('userInfo');
    // console.log('first userInfo',userInfo)
    // if(userInfo){
    //   props.setUserInf(JSON.parse(userInfo) );
    // }

  //}

  // constructor(props){
  //   super(props);

  //   let userInfo = '';
  //   props.setUserInf(JSON.parse(userInfo) );
  //   //setUserInf
  // }

  componentWillMount(){
    let { cookies,cookieServer } = this.props;
    console.log('first userInfo',cookies,cookieServer)

    if(cookies && cookies.get('__session') !== undefined){
      let session = cookies.get('__session')
      this.props.setUserInf(session.userInf);
    }else if(cookieServer && cookieServer.userInf !== undefined){

      this.props.setUserInf(cookieServer.userInf);
    }
  }

  render() {
    console.log('App render.');
    let { callFrom } = this.props;
    console.log('render from',callFrom);
    
    return (
      <div>
        <Switch>
          <Route path='/' render={(props) => (
            <Frontsite {...props} />
          )}/>
        </Switch>
      </div>
    );
  }

}


export default withCookies(connect(()=>({}), {setUserInf})(App));
