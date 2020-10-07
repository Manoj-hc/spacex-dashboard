import React, { Component } from 'react';
import './Capsules.css';
import { apiCall } from './ApiCall';
import { observer, inject } from 'mobx-react';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Capsules extends Component {
  state = {
    capsules: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('capsules');
    this.setState({ capsules: res.data });
    AOS.init();
    AOS.refresh();
    this.setState({ loading: true });
  }

  convertDate = (unixDate) => {
    const ms = unixDate * 1000;
    const dateObject = new Date(ms);
    const date = dateObject.toLocaleString();
    return date;
  };

  render() {
    return (
      <div>
        {this.props.StateStore.userType === 'admin' ? (
          <div className='capsule-container'>
            {this.state.loading ? (
              <div className='overlay-container'>
                <h1>SpaceX Capsules</h1>
                {this.state.capsules.map((capsule) => {
                  return (
                    <div
                      className='eachCapsule'
                      key={capsule.capsule_serial}
                      data-aos='zoom-in'
                      data-aos-delay='50'
                      data-aos-duration='1500'
                    >
                      <h2>
                        Name: <span>{capsule.capsule_serial}</span>
                      </h2>
                      <h3>
                        Capsule ID: <span>{capsule.capsule_id}</span>
                      </h3>
                      <h3>
                        Capsule Type: <span>{capsule.type}</span>
                      </h3>
                      <h3>
                        Status: <span>{capsule.status.toUpperCase()}</span>
                      </h3>
                      <h3>
                        Original Launch Date:{' '}
                        <span>
                          {this.convertDate(capsule.original_launch_unix)} IST
                        </span>
                      </h3>
                      <h3>Missions:</h3>
                      <p>
                        {capsule.missions.map((mission, i) => {
                          return (
                            <span key={i}>
                              {(i ? ', ' : '') +
                                `[Name- ${mission.name}, Flight- ${mission.flight}]`}
                            </span>
                          );
                        })}
                      </p>
                      <h3>
                        Landings: <span>{capsule.landings}</span>
                      </h3>
                      <h3>
                        Reuse Count: <span>{capsule.reuse_count}</span>
                      </h3>
                      <h3>Additional Details: </h3>
                      <p>{capsule.details}</p>
                    </div>
                  );
                })}
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
        ) : (
          <div className='info-container'>
            <div className='overlay-container'>
              <h1>You don't have permission to view this page.</h1>
              <h2 className='text-center'>Kindly contact your Administrator</h2>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default inject('StateStore')(observer(Capsules));
