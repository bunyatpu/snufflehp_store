import React, { Component }  from 'react';
import {Provider} from 'react-redux'
import { StaticRouter } from 'react-router-dom';
import App from './App';
import database from 'firebase-database';
//import {init as firebaseInit} from './firebase/firebase'
//import { sessionService } from 'redux-react-session';
import configureStore from './config/configStore'
// import { CookiesProvider } from 'react-cookie';

//let store = configureStore()

class AppSsr extends Component{

  constructor(props){
    super(props)
    let store = configureStore(props.init);
    this.state = {
      store:store
    }
    database.initializeApp(props.fireConf)
    //sessionService.initServerSession(store, props.req);
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
