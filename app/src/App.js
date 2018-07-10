import React, { Component } from 'react';
import { connect } from 'react-redux'
import {setUserInf} from './actions/User';
import { Switch, Route,withRouter } from 'react-router-dom';
import Frontsite from './components/Frontsite'
// import { withCookies } from 'react-cookie';
import cookie from 'react-cookies'
//import Admin from './components/Admin'
import './App.css';
//import 'librarys/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

//import { verifieEmail } from './firebase/auth'
import {loadUserInf,loadUserListener} from './actions/User'
//import VerifyMail from "./components/common/auth/VerifyMail";
//import { connectUser } from './firebase/user'


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

    //regisUser();

    let { cookieServer } = this.props;

    let userInf = {}
    if(cookieServer && cookieServer.userInf !== undefined){
      userInf = cookieServer.userInf
      //this.props.setUserInf(cookieServer.userInf);
    }else{

      
      const session = cookie.load('__session')
      userInf = (session !== undefined) ? session.userInf:{}
      //console.log('session',session);
      //this.props.setUserInf(userInf);
    }


   // console.log('init load userInf==>',userInf);
    this.props.setUserInf(userInf);

    if(userInf.authId !== undefined){
      console.log('load user info')
      // this.props.loadUserInf(userInf.authId).then((res)=>{
      //   //console.log('load user complete')
      // }).catch((error)=>{
      //   //console.log(error)
      // })

      this.props.loadUserListener(userInf.authId)

      //connectUser(userInf.authId)
    }


  }

  render() {
    // console.log('App render.');
    //let { callFrom } = this.props;
    // console.log('render from',callFrom);
    
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

const mapStateToProps = (state) => {
  return {
    historya:state.RouteInfo.history
  }
}

export default withRouter(connect(mapStateToProps, {setUserInf,loadUserInf,loadUserListener})(App));






// return (
//   <div>
//     <nav>
//     <ul>
//       <li><Link to='/'>Home</Link></li>
//       <li><Link to='/preorder1'>preorder1</Link></li>
//     </ul>
//   </nav>
//     <Switch>
//       <Route  exact={true} path="/" render={()=><h2>Home</h2>} />
//       <Route   path="/preorder1" render={()=><h2>order</h2>} /> 
//     </Switch>
//   </div>
// );
