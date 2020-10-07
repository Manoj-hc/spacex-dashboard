import React, { Component } from 'react';
import './Launches.css';
import { apiCall } from './ApiCall';
import YouTube from 'react-youtube';
import { observer, inject } from 'mobx-react';
import { SpinnerCircular } from 'spinners-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Launches extends Component {
  state = {
    launches: [],
    loading: false,
  };

  async componentDidMount() {
    var res = await apiCall('launches');
    this.setState({ launches: res.data });
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

  VideoOnReady = (event) => {
    event.target.pauseVideo();
  };

  render() {
    const opts = {
      height: 350,
      width: 600,
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <div>
        {this.props.StateStore.userType === 'admin' ? (
          <div className='launch-container'>
            {this.state.loading ? (
              <div className='overlay-container'>
                <h1>All SpaceX Launches</h1>
                {this.state.launches.map((launch, i) => {
                  return (
                    <div
                      className='eachLaunch'
                      key={i}
                      data-aos='zoom-in'
                      data-aos-delay='50'
                      data-aos-duration='1500'
                    >
                      <div className='img-container'>
                        <img
                          src={launch.links.mission_patch}
                          alt='Mission Patch'
                          width='200'
                          height='200'
                        />
                      </div>
                      <h2>
                        Mission Name: <span>{launch.mission_name}</span>
                      </h2>
                      <h3>
                        Flight Number <span>{launch.flight_number}</span>
                      </h3>
                      <h3>Additional Details: </h3>
                      <p>{launch.details}</p>
                      <h3>
                        Launch Date:{' '}
                        <span>
                          {this.convertDate(launch.launch_date_unix)} IST
                        </span>
                      </h3>
                      <h3>
                        Rocket Used: <span>{launch.rocket.rocket_name}</span>
                      </h3>
                      <h4>
                        Core Used:
                        {launch.rocket.first_stage.cores.map((core, i) => {
                          return (
                            <span key={i}>
                              {(i ? ', ' : '') + `${core.core_serial}`}
                            </span>
                          );
                        })}
                      </h4>
                      <h4>
                        Payload Details:
                        {launch.rocket.second_stage.payloads.map(
                          (payload, i) => {
                            return (
                              <span key={i}>
                                {(i ? ', ' : '') +
                                  `[Name- ${payload.payload_id}, Type-${payload.payload_type}, Manufacturer-${payload.manufacturer}, Mass-${payload.payload_mass_kg}kg]`}
                              </span>
                            );
                          }
                        )}
                      </h4>
                      <h3>
                        Launch Site:{' '}
                        <span>{launch.launch_site.site_name_long}</span>
                      </h3>
                      {launch.launch_success ? (
                        <h3>Launch Status: Success</h3>
                      ) : (
                        <h3>Launch Status: Failure</h3>
                      )}
                      <div className='video-container'>
                        <div className='video-area'>
                          <YouTube
                            videoId={launch.links.youtube_id}
                            opts={opts}
                            onReady={this.VideoOnReady}
                          />
                        </div>
                        <div className='button-area'>
                          <a
                            href={launch.links.video_link}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <button>Video Link</button>
                          </a>
                        </div>
                      </div>
                      <p> </p>
                      <div className='buttons'>
                        <a
                          href={launch.links.article_link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <button>Read More</button>
                        </a>
                        <a
                          href={launch.links.wikipedia}
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

export default inject('StateStore')(observer(Launches));
