import axios from "axios";
require('dotenv').config()

class TesteIntegracaoService {

  static _withBaseUrl(path = "") {
    return `http://localhost:3000/tools/${path}`;
  }

  static getValues() {
    return axios(TesteIntegracaoService._withBaseUrl("teste-integracao"));
  }

}

export default TesteIntegracaoService
