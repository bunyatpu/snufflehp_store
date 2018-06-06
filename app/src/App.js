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
    let { cookieServer } = this.props;

    // console.log('first cookieServer',cookieServer)

    // if(cookies && cookies.get('__session') !== undefined){
    //   let session = cookies.get('__session')
    //   this.props.setUserInf(session.userInf);
    // }else 
    if(cookieServer && cookieServer.userInf !== undefined){

      this.props.setUserInf(cookieServer.userInf);
    }else{

      
      const session = cookie.load('__session')
      const userInf = (session !== undefined) ? session.userInf:{}
      //console.log('session',session);
      this.props.setUserInf(userInf);

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

export default withRouter(connect(()=>({}), {setUserInf})(App));






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
