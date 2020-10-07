import React, { Component } from 'react';
import './Rockets.css';
import { apiCall } from './ApiCall';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Rockets extends Component {
  state = {
    rockets: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('rockets');
    this.setState({ rockets: res.data });
    AOS.init();
    AOS.refresh();
    this.setState({ loading: true });
  }

  render() {
    return (
      <div className='rocket-container'>
        {this.state.loading ? (
          <div className='overlay-container'>
            <h1>All SpaceX Rockets</h1>
            {this.state.rockets.map((rocket) => {
              return (
                <div
                  className='eachRocket'
                  key={rocket.id}
                  data-aos='zoom-in'
                  data-aos-delay='50'
                  data-aos-duration='1500'
                >
                  <h2>
                    Name: <span>{rocket.rocket_name}</span>
                  </h2>
                  <h3>
                    Rocket Type: <span>{rocket.rocket_type}</span>
                  </h3>
                  <p>{rocket.description}</p>
                  <h3>
                    Status: <span>{rocket.active ? 'Yes' : 'No'}</span>
                  </h3>
                  <h3>
                    First FLight: <span>{rocket.first_flight}</span>
                  </h3>
                  <h3>
                    Country: <span>{rocket.country}</span>
                  </h3>
                  <h3>
                    Company: <span>{rocket.company}</span>
                  </h3>
                  <h3>
                    Success %: <span>{rocket.success_rate_pct}</span>
                  </h3>
                  <h3>
                    Stages: <span>{rocket.stages}</span>
                  </h3>
                  <h3>
                    Cost Per Launch: <span>{rocket.cost_per_launch} USD</span>
                  </h3>
                  <h3>
                    Rocket Height:{' '}
                    <span>
                      {rocket.height.meters}m ({rocket.height.feet}ft)
                    </span>
                  </h3>
                  <h3>
                    Rocket Diameter:{' '}
                    <span>
                      {rocket.diameter.meters}m ({rocket.diameter.feet}ft)
                    </span>
                  </h3>
                  <h3>
                    Rocket Mass:{' '}
                    <span>
                      {rocket.mass.kg}kg ({rocket.mass.lb}lbs)
                    </span>
                  </h3>
                  <h2>Engine Details: </h2>
                  <h4>
                    Engine Type: <span>{rocket.engines.type}</span>
                  </h4>
                  <h4>
                    Number of Engines: <span>{rocket.engines.number}</span>
                  </h4>
                  <h4>
                    Engine Layout: <span>{rocket.engines.layout}</span>
                  </h4>
                  <h4>
                    Thrust (Sea Level):{' '}
                    <span>
                      {rocket.engines.thrust_sea_level.kN}kN (
                      {rocket.engines.thrust_sea_level.lbf}lbf)
                    </span>
                  </h4>
                  <h4>
                    Thrust To Weight:{' '}
                    <span>{rocket.engines.thrust_to_weight}</span>
                  </h4>
                  <div className='buttons'>
                    <a
                      href={rocket.wikipedia}
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
    );
  }
}

export default Rockets;
