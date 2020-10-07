import React, { Component } from 'react';
import { apiCall } from './ApiCall';
import { observer, inject } from 'mobx-react';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Missions.css';

class Missions extends Component {
  state = {
    missions: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('missions');
    this.setState({ missions: res.data });
    AOS.init();
    AOS.refresh();
    this.setState({ loading: true });
  }

  render() {
    return (
      <div>
        {this.props.StateStore.userType === 'admin' ? (
          <div className='mission-container'>
            {this.state.loading ? (
              <div className='overlay-container'>
                <h1>Missions</h1>
                {this.state.missions.map((mission) => {
                  return (
                    <div
                      className='eachMission'
                      key={mission.mission_id}
                      data-aos='zoom-in'
                      data-aos-delay='50'
                      data-aos-duration='1500'
                    >
                      <h2>
                        Mission Name: <span>{mission.mission_name}</span>
                      </h2>
                      <h3>
                        Mission ID: <span>{mission.mission_id}</span>
                      </h3>
                      <p>{mission.description}</p>
                      <h3>Manufacturers:</h3>
                      <p>
                        {mission.manufacturers.map((m, i) => {
                          return <span key={i}>{(i ? ', ' : '') + m}</span>;
                        })}
                      </p>
                      <div className='buttons'>
                        <a
                          href={mission.website}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <button>Website</button>
                        </a>
                        <a
                          href={mission.wikipedia}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <button>Wikipedia</button>
                        </a>
                        {mission.twitter ? (
                          <a
                            href={mission.twitter}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <button>Twitter</button>
                          </a>
                        ) : (
                          ''
                        )}
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

export default inject('StateStore')(observer(Missions));
