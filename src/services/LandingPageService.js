import axios from "axios";
require('dotenv').config()

class LandingPageService {

  static _withBaseUrl(path = "") {
    return `http://localhost:3000/${path}`;
  }

  static getValues() {
    return axios(LandingPageService._withBaseUrl(""));
  }

}

export default LandingPageService
