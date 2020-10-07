import React, { Component } from 'react';
import './Ships.css';
import { apiCall } from './ApiCall';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Ships extends Component {
  state = {
    ships: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('ships');
    this.setState({ ships: res.data });
    AOS.init();
    AOS.refresh();
    this.setState({ loading: true });
  }

  render() {
    return (
      <div className='ship-container'>
        {this.state.loading ? (
          <div className='overlay-container'>
            <h1>SpaceX Ships</h1>
            {this.state.ships.map((ship) => {
              return (
                <div
                  className='eachShip'
                  key={ship.ship_id}
                  data-aos='zoom-in'
                  data-aos-delay='50'
                  data-aos-duration='1500'
                >
                  <div className='img-container'>
                    {ship.url !== null ? (
                      <a
                        href={ship.image}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img
                          src={ship.image}
                          width='200'
                          height='200'
                          alt='ship'
                        />
                      </a>
                    ) : (
                      <h3>Image Not Found!</h3>
                    )}
                  </div>
                  <h2>
                    Ship Name: <span>{ship.ship_name}</span>
                  </h2>
                  <h3>
                    Ship Type: <span>{ship.ship_type}</span>
                  </h3>
                  <h3>
                    Active Status: <span>{ship.active ? 'Yes' : 'No'}</span>
                  </h3>
                  <h3>
                    Roles:{' '}
                    {ship.roles.map((role, i) => {
                      return <span key={i}>{(i ? ', ' : '') + role}</span>;
                    })}
                  </h3>
                  <h3>Missions:</h3>
                  <p>
                    {ship.missions.map((mission, i) => {
                      return (
                        <span key={i}>
                          {(i ? ', ' : '') +
                            `[Name ${mission.name}, Flights ${mission.flight}]`}
                        </span>
                      );
                    })}
                  </p>
                  <h3>
                    Home Port: <span>{ship.home_port}</span>
                  </h3>
                  <h4>
                    Year Built: <span>{ship.year_built}</span>
                  </h4>
                  <h4>
                    Weight: <span>{ship.weight_kg}kg</span>
                  </h4>
                  {ship.url !== null ? (
                    <div className='buttons'>
                      <a
                        href={ship.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <button>Read More</button>
                      </a>
                    </div>
                  ) : (
                    <h3>[Full Data Not Available]</h3>
                  )}
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

export default Ships;
