import React, { useState, useEffect } from 'react';
import './Home.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  Link,
  useHistory,
} from 'react-router-dom';
import { Control } from './Control';

function Home({ userType, changeUser }) {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const [control, setControl] = useState([]);

  useEffect(() => {
    setControl(Control);
  }, []);

  let clickHandle = (event) => {
    localStorage.removeItem('isLoggedIn');
    history.pushState('/');
    changeUser('');
  };

  return (
    <div className='main-container'>
      <Router>
        <div className='navbar-container'>
          <ul>
            {control.map((link, i) => {
              var txt = link.link.toUpperCase();
              if (userType === 'admin' || link.showToUser) {
                return (
                  <li key={i}>
                    <Link to={`${url}/${link.link}`}>{txt}</Link>
                  </li>
                );
              }
            })}
            <li>
              <a href='/' onClick={clickHandle}>
                LOG OUT
              </a>
            </li>
          </ul>
        </div>

        <div className='content-container'>
          <div className='subpage-container'>
            <Switch>
              <Route exact path={path}>
                <div className='info-container'>
                  <div className='overlay-container'>
                    <h1>Welcome to SpaceX Dashboard</h1>
                    <h2 className='welcome-msg'>
                      This is a Project created with ReactJS and SpaceX Public
                      API.
                    </h2>
                  </div>
                </div>
              </Route>
              <Route path={`${path}/info`} component={Control[0].component} />
              {control.map((link) => {
                return (
                  <Route
                    path={`${path}/${link.link}`}
                    component={link.component}
                    key={link.link}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Home;
