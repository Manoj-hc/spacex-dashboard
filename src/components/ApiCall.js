import Axios from 'axios';

export const apiCall = async (queryString) => {
  try {
    const resp = await Axios.get(
      `https://api.spacexdata.com/v3/${queryString}`
    );
    return resp;
  } catch (error) {
    console.log('API Error Occured !');
    console.log(error);
    window.alert('Something Went Wrong!');
  }
};
