import React, { Component } from 'react';
import './Cores.css';
import { apiCall } from './ApiCall';
import { observer, inject } from 'mobx-react';
import { SpinnerCircular } from 'spinners-react';
import ReactPaginate from 'react-paginate';

class Cores extends Component {
  state = {
    cores: [],
    loading: false,
    offset: 0,
    elements: [],
    perPage: 5,
    currentPage: 0,
  };

  async componentDidMount() {
    var res = await apiCall('cores');
    this.setState(
      {
        cores: res.data,
        pageCount: Math.ceil(res.data.length / this.state.perPage),
        loading: true,
      },
      () => this.setElementsForCurrentPage()
    );
  }

  setElementsForCurrentPage() {
    let elements = this.state.cores
      .slice(this.state.offset, this.state.offset + this.state.perPage)
      .map((core, i) => {
        return (
          <div className='eachCore' key={i}>
            <h2>
              Core Name: <span>{core.core_serial}</span>
            </h2>
            <h3>
              Status: <span>{core.status.toUpperCase()}</span>
            </h3>
            <h3>
              Original Launch Date:{' '}
              <span>{this.convertDate(core.original_launch_unix)}</span>
            </h3>
            <h3>Missions:</h3>
            <p>
              {core.missions.map((mission, i) => {
                return (
                  <span key={i}>
                    {(i ? ', ' : '') +
                      `[Name- ${mission.name}, Flight- ${mission.flight}]`}
                  </span>
                );
              })}
            </p>
            <h3>
              Reuse Count: <span>{core.reuse_count}</span>
            </h3>
            <h3>Water Landing: {`${core.water_landing}`}</h3>
            <h4>Additional Details: </h4>
            <p>{core.details}</p>
          </div>
        );
      });
    this.setState({ elements: elements });
  }

  convertDate = (unixDate) => {
    const ms = unixDate * 1000;
    const dateObject = new Date(ms);
    const date = dateObject.toLocaleString();
    return date;
  };

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  render() {
    let paginationElement;
    if (this.state.pageCount > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={<span className='gap'>...</span>}
          pageCount={this.state.pageCount}
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={'pagination'}
          previousLinkClassName={'previous_page'}
          nextLinkClassName={'next_page'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
        />
      );
    }

    return (
      <div>
        {this.props.StateStore.userType === 'admin' ? (
          <div className='core-container'>
            {this.state.loading ? (
              <div className='overlay-container'>
                {paginationElement}
                {this.state.elements}
                {paginationElement}
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

export default inject('StateStore')(observer(Cores));
