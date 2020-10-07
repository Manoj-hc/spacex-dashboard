import React, { Component } from 'react';
import { apiCall } from './ApiCall';
import './History.css';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class History extends Component {
  state = {
    histories: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('history');
    this.setState({ histories: res.data });
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
      <div className='history-container'>
        {this.state.loading ? (
          <div className='overlay-container'>
            <h1>Historical Events at SpaceX</h1>
            {this.state.histories.map((history) => {
              return (
                <div
                  className='eachHistory'
                  key={history.id}
                  data-aos='zoom-in'
                  data-aos-delay='50'
                  data-aos-duration='1500'
                >
                  <h2>{history.title}</h2>
                  <p>{history.details}</p>
                  <h3>
                    Flight Number: <span>{history.flight_number}</span>
                  </h3>
                  <h3>
                    Event Date:{' '}
                    <span>{this.convertDate(history.event_date_unix)} IST</span>
                  </h3>
                  <div className='buttons'>
                    <a
                      href={history.links.article}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button>Read More</button>
                    </a>
                    <a
                      href={history.links.wikipedia}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button>Wikipedia</button>
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

export default History;
