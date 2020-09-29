import axios from "axios";
require('dotenv').config()

class LandingPageService {

  static _withBaseUrl(path = "") {
    const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${API_SERVER_URL}/${path}`;
  }

  static getValues() {
    return axios(LandingPageService._withBaseUrl(""));
  }

}

export default LandingPageService
