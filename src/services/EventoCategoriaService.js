import { Component } from "react";
import axios from "axios";

class EventoCategoriaService extends Component {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      /*   'Authorization': 'Bearer ' + localStorage.getItem('jwttoken') */
    }
  };


  static _withBaseUrl(path = "") {
    const BACKEND_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${BACKEND_SERVER_URL}/${path}`;
  }

  static getAll() {
    return axios(EventoCategoriaService._withBaseUrl("eventos-categorias"));
  }

}

export default EventoCategoriaService



