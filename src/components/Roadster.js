import React, { Component } from 'react';
import './Info.css';
import { apiCall } from './ApiCall';
import { SpinnerCircular } from 'spinners-react';

class Roadster extends Component {
  state = {
    info: { flickr_images: [] },
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('roadster');
    this.setState({ info: res.data });
    this.setState({ loading: true });
  }

  render() {
    return (
      <div className='info-container'>
        {this.state.loading ? (
          <div className='overlay-container'>
            <div className='image-container'>
              {this.state.info.flickr_images.map((image, i) => {
                return (
                  <a
                    href={image}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={i}
                    className='roadster-image'
                  >
                    <img src={image} alt='roadster' width='200' height='200' />
                  </a>
                );
              })}
              <div className='mobile-image'>
                <a
                  href='https://farm5.staticflickr.com/4615/40143096241_11128929df_b.jpg'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src='https://farm5.staticflickr.com/4615/40143096241_11128929df_b.jpg'
                    alt='roadster'
                    width='200'
                    height='200'
                  />
                </a>
              </div>
            </div>
            <h2>
              Name: <span>{this.state.info.name}</span>
            </h2>
            <p>{this.state.info.details}</p>
            <h3>
              Launch Date: <span>{this.state.info.launch_date_utc}</span>
            </h3>
            <h3>
              Launch Mass:{' '}
              <span>
                {this.state.info.launch_mass_kg}kg (
                {this.state.info.launch_mass_lbs}lbs)
              </span>
            </h3>
            <h3>
              Speed:{' '}
              <span>
                {Math.round(this.state.info.speed_kph)}kmph (
                {Math.round(this.state.info.speed_mph)}mph)
              </span>
            </h3>
            <h3>
              Distance from Earth:{' '}
              <span>
                {Math.round(this.state.info.earth_distance_km)}
                km ({Math.round(this.state.info.earth_distance_mi)}mi)
              </span>
            </h3>
            <h3>
              Distance from Mars:{' '}
              <span>
                {Math.round(this.state.info.mars_distance_km)}km (
                {Math.round(this.state.info.mars_distance_mi)}mi)
              </span>
            </h3>
            <a
              href={this.state.info.wikipedia}
              target='_blank'
              rel='noopener noreferrer'
            >
              <button>Read More</button>
            </a>
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

export default Roadster;
