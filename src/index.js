import React,{Component} from 'react';
import ReactDOM from 'react-dom'

import {BrowserRouter , Route, Switch} from 'react-router-dom'

import Home from './Home'
import Management from './manage'
import Dispacher from './dispacher'
import Error from './Error'
import User from './User'
import Maintenance from './Maintenance'
class App extends Component{
  render(){
    return(
      <BrowserRouter> 
        <div>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/manage" component={Management}/>
            <Route path="/admin" component={Dispacher}/>
            <Route path="/maintenance" component={Maintenance}/>
            <Route path="/user" component={User}/>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
