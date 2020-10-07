import React, { Component } from 'react';
import './Login.css';
import logo from '../img/logo.png';
import { observer, inject } from 'mobx-react';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleClick = () => {
    if (this.state.email === 'admin') {
      console.log('Admin!');
      this.props.StateStore.changeUser('admin');
      localStorage.setItem('isLoggedIn', true);
      this.props.history.push('/home');
    } else if (this.state.email === 'user') {
      console.log('User!');
      this.props.StateStore.changeUser('user');
      localStorage.setItem('isLoggedIn', true);
      this.props.history.push('/home');
    } else {
      alert('Wrong username or password!');
    }
  };

  componentDidMount() {
    alert('Welcome To SpaceX Dashboard!');
    alert(
      'Use "admin" as username for Admin Access and use "user" as username for Restricted Access. You can enter anything as Password for the time being.'
    );
  }

  render() {
    return (
      <div className='loginBody'>
        <div className='container'>
          <div className='logo'>
            <img src={logo} alt='logo'></img>
          </div>
          <div className='loginWindow'>
            <div className='formElements'>
              <p>
                <strong>Email</strong>
              </p>
              <input
                type='text'
                placeholder='Enter Email'
                value={this.state.email}
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
              />
              <p>
                <strong>Password</strong>
              </p>
              <input
                type='password'
                placeholder='Enter Password'
                value={this.state.password}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                required
              />
              <p> </p>
              <div className='buttonClass'>
                <button onClick={this.handleClick}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('StateStore')(observer(Login));
