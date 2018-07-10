import React, { Component }  from 'react';
import {Provider} from 'react-redux'
import { StaticRouter } from 'react-router-dom';
import App from './App';
//import database from 'firebase-database';
//import fbUser from './firebase/user'
//import {init as firebaseInit} from './firebase/firebase'
//import { sessionService } from 'redux-react-session';
import configureStore from './config/configStore'
// import { CookiesProvider } from 'react-cookie';
//var firebase = require('firebase');
//const firebase = global.firebase || require('firebase');
//let store = configureStore()

class AppSsr extends Component{

  constructor(props){
    super(props)
    let store = configureStore(props.init);
    this.state = {
      store:store
    }

    //console.log('global1',global.testNameb )
    //console.log('global2',testNameb )
    //console.log('AppSsr global',global.firebase)
    //database.initializeApp(props.fireConf)
    //sessionService.initServerSession(store, props.req);
    // fbUser.loadUser().then((res)=>{
    //   console.log('load user ser secc',res);
    // }).catch((error)=>{
    //   console.log('');
    // })

    //console.log('===>firebase',firebase)
    //var userCurrent = firebase.auth().currentUser;
   // console.log('11userCurrent',userCurrent)

   

  }

  render(){

  let {req,context,cookies} = this.props;

  return (
    <Provider store={this.state.store}>
      <StaticRouter
          location={req.url}
          context={context}
        >
          <App callFrom="server" cookieServer={cookies} />
        </StaticRouter>
    </Provider>  
  )
}
}

export default AppSsr;


// render(){

//   let {req,context,cookies} = this.props;

//   return (
//     <Provider store={this.state.store}>
//       <StaticRouter
//           location={req.url}
//           context={context}
//         >
//           <App callFrom="server" cookieServer={cookies} />
//         </StaticRouter>
//     </Provider>  
//   )
// }
