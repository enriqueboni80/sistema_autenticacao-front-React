import axios from "axios";
require('dotenv').config()

class HomeService {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user_session')).jwtToken}`
    }
  };

  static _withBaseUrl(path = "") {
    const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${API_SERVER_URL}/${path}`;
  }

  static getValues() {
    return axios(HomeService._withBaseUrl("home"), this.CONFIG);
  }

}

export default HomeService
