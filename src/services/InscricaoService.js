import { Component } from "react";
import axios from "axios";

class InscricaoService extends Component {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      /*   'Authorization': 'Bearer ' + localStorage.getItem('jwttoken') */
    }
  };

  static setObject = (formData) => {
    return {
      "evento_id": formData.eventoId,
      "user_id": formData.userId,
    }
  }

  static _withBaseUrl(path = "") {
    const BACKEND_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${BACKEND_SERVER_URL}/${path}`;
  }

  static inscrever(eventoId, userId) {
    var formData = {
      eventoId,
      userId
    }
    var serviceObj = this.setObject(formData)
    return axios.post(InscricaoService._withBaseUrl("eventos-inscricoes"), serviceObj, this.CONFIG);
  }

  static getByEventoId(eventoId) {
    return axios.get(InscricaoService._withBaseUrl(`eventos-inscricoes/${eventoId}`));
  }


}

export default InscricaoService



