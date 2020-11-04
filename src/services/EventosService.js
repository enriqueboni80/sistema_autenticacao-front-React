import axios from "axios";
/* require('dotenv').config() */

class EventoService {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  static _withBaseUrl(path = "") {
    const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${API_SERVER_URL}/${path}`;
  }

  static getValues() {
    return axios(EventoService._withBaseUrl("eventos"));
  }

}

export default EventoService
