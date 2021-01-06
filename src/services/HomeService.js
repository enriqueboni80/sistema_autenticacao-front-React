import axios from "axios";
require('dotenv').config()

class HomeService {


  static _withBaseUrl(path = "") {
    const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${API_SERVER_URL}/${path}`;
  }

  static getValues() {
    return axios(HomeService._withBaseUrl("home"));
  }

}

export default HomeService
