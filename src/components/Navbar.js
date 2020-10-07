import React, { Component } from 'react';
import './Navbar.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            <li>
              <Link to={'home/info'}>Info</Link>
            </li>
            <li>
              <Link to={'home/roadster'}>Roadster</Link>
            </li>
            <li>
              <Link to={'home/history'}>History</Link>
            </li>
            <li>
              <Link to={'home/launches'}>Launches</Link>
            </li>
            <li>
              <Link to={'home/capsules'}>Capsules</Link>
            </li>
            <li>
              <Link to={'home/cores'}>Cores</Link>
            </li>
            <li>
              <Link to={'home/dragons'}>Dragons</Link>
            </li>
            <li>
              <Link to={'home/ladingpads'}>Landing Pads</Link>
            </li>
            <li>
              <Link to={'home/launchpads'}>Launch Pads</Link>
            </li>
            <li>
              <Link to={'home/missions'}>Missions</Link>
            </li>
            <li>
              <Link to={'home/payloads'}>Payloads</Link>
            </li>
            <li>
              <Link to={'home/rockets'}>Rockets</Link>
            </li>
            <li>
              <Link to={'home/ships'}>Ships</Link>
            </li>
          </ul>
        </Router>
      </div>
    );
  }
}

export default Navbar;
