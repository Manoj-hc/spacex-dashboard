import React from 'react';
import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import logo from '../img/logo.png';
import './Info.css';
import { apiCall } from './ApiCall';
import { SpinnerCircular } from 'spinners-react';

class Info extends Component {
  state = {
    info: { headquarters: {} },
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('info');
    this.setState({ info: res.data });
    this.setState({ loading: true });
  }

  render() {
    return (
      <div className='info-container'>
        {this.state.loading ? (
          <div className='overlay-container'>
            <div className='image-container'>
              <img src={logo} alt='logo' width='355' height='200' />
            </div>
            <h3>
              Founder: <span>{this.state.info.founder}</span>
            </h3>
            <h3>
              Founded On: <span>{this.state.info.founded}</span>
            </h3>
            <h3>
              CEO: <span>{this.state.info.ceo}</span>
            </h3>
            <h3>
              CTO: <span>{this.state.info.cto}</span>
            </h3>
            <h3>
              COO: <span>{this.state.info.coo}</span>
            </h3>
            <h3>
              CTO Propulsion: <span>{this.state.info.cto_propulsion}</span>
            </h3>
            <h3>
              Employees: <span>{this.state.info.employees}</span>
            </h3>
            <h3>Summary:</h3>
            <p>{this.state.info.summary}</p>
            <h3>Headquarters: </h3>
            <p>
              {this.state.info.headquarters.address},{' '}
              {this.state.info.headquarters.city},{' '}
              {this.state.info.headquarters.state}
            </p>
            <h3>
              Valuation: <span>{this.state.info.valuation}</span>
            </h3>
            <h3>
              Test Sites: <span>{this.state.info.test_sites}</span>
            </h3>
          </div>
        ) : (
          <div className='spinner-container'>
            <SpinnerCircular
              size={50}
              thickness={100}
              speed={100}
              color='rgba(56, 173, 72, 1)'
              secondaryColor='rgba(0, 0, 0, 0.44)'
            />
          </div>
        )}
      </div>
    );
  }
}

export default inject('StateStore')(observer(Info));
