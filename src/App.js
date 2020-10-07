import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import LoginCheck from './components/LoginCheck';
import Login from './components/Login';
import Home from './components/Home';
import { observer, inject } from 'mobx-react';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/' exact component={withRouter(LoginCheck)} />
            <Route path='/home'>
              <Home
                userType={this.props.StateStore.userType}
                changeUser={this.props.StateStore.changeUser}
              />
            </Route>
            <Route path='/login' exact component={withRouter(Login)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default inject('StateStore')(observer(App));
