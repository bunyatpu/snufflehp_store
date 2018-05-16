import React, { Component } from 'react';

import { Switch, Route } from 'react-router';


import Frontsite from './components/Frontsite'
//import Admin from './components/Admin'
import './App.css';
//import 'librarys/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {

  render() {
    console.log('App render.');
    
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






// render() {
//   return (
//     <Provider store={this.store}>
//       <BrowserRouter>
//         <Switch>
//           <Route path='/admin' component={Admin}></Route>
//           <Route path='/' render={(props) => (
//             <Home {...props} />
//           )}/>
//         </Switch>
//       </BrowserRouter>
//     </Provider>
//   );
// }


// render() {
//   return (
//     <Provider store={this.store}>
//       <BrowserRouter>
//         <Switch>
//           <Route path='/admin' render={(props) => (
//             <Admin {...props} />
//           )}/>
//           <Route path='/' render={(props) => (
//             <Home {...props} />
//           )}/>
//         </Switch>
//       </BrowserRouter>
//     </Provider>
//   );
// }

export default App;
