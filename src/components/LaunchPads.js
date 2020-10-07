import React, { Component } from 'react';
import './LaunchPads.css';
import { apiCall } from './ApiCall';
import { observer, inject } from 'mobx-react';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class LaunchPads extends Component {
  state = {
    launchpads: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('launchpads');
    this.setState({ launchpads: res.data });
    AOS.init();
    AOS.refresh();
    this.setState({ loading: true });
  }

  render() {
    return (
      <div>
        {this.props.StateStore.userType === 'admin' ? (
          <div className='launchpad-container'>
            {this.state.loading ? (
              <div className='overlay-container'>
                <h1>All SpaceX Launch Pads</h1>
                {this.state.launchpads.map((pad) => {
                  return (
                    <div
                      className='eachPad'
                      key={pad.id}
                      data-aos='zoom-in'
                      data-aos-delay='50'
                      data-aos-duration='1500'
                    >
                      <h2>
                        Site Name: <span>{pad.site_name_long}</span>
                      </h2>
                      <p>{pad.details}</p>
                      <h3>
                        Status: <span>{pad.status}</span>
                      </h3>
                      <h3>
                        Attempted Launches:{' '}
                        <span>{pad.attempted_launches}</span>
                      </h3>
                      <h3>
                        Successful Launched:{' '}
                        <span>{pad.successful_launches}</span>
                      </h3>
                      <h3>
                        Location:{' '}
                        <span>
                          {pad.location.name}, {pad.location.region}
                        </span>
                      </h3>
                      <h3>
                        Vehicles Launched:{' '}
                        {pad.vehicles_launched.map((vehicle, i) => {
                          return (
                            <span key={i}>{(i ? ', ' : '') + vehicle}</span>
                          );
                        })}
                      </h3>
                      <div className='buttons'>
                        <a
                          href={pad.wikipedia}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <button>Read More</button>
                        </a>
                      </div>
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

export default inject('StateStore')(observer(LaunchPads));
