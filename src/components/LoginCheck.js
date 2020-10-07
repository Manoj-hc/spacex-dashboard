import React from 'react';
import { Component } from 'react';
import { useHistory } from 'react-router-dom';

function Display() {
  let history = useHistory();
  if (localStorage.getItem('isLoggedIn')) {
    history.push('/home');
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    history.push('/login');
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

class LoginCheck extends Component {
  render() {
    return <Display />;
  }
}

export default LoginCheck;
