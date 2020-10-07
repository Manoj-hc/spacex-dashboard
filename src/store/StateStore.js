import { action, observable, decorate } from 'mobx';
import Axios from 'axios';

class StateStore {
  userType = '';

  changeUser = (value) => {
    this.userType = `${value}`;
  };

  getResponse = async (val) => {
    let resp = {};
    try {
      resp = await Axios.get(`https://api.spacexdata.com/v3/${val}`);
    } catch (error) {
      console.log('Error Occured !');
      console.log(error);
      window.alert('Something Went Wrong!');
    }
    console.log(resp);
    return resp;
  };
}

decorate(StateStore, {
  userType: observable,
  changeUser: action,
  getResponse: action,
});

const store = new StateStore();
export default store;
