import axios from "axios";
require('dotenv').config()

class TesteIntegracaoService {

  static _withBaseUrl(path = "") {
    const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${API_SERVER_URL}/tools/${path}`;
  }

  static getValues() {
    return axios(TesteIntegracaoService._withBaseUrl("teste-integracao"));
  }

}

export default TesteIntegracaoService
