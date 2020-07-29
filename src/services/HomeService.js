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
    return `http://localhost:3000/${path}`;
  }

  static getValues() {
    return axios(HomeService._withBaseUrl("home"), this.CONFIG);
  }

}

export default HomeService
