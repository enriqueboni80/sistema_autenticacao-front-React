import { Component } from "react";
import axios from "axios";
import headerJwt from "./shared/HeaderJWT"

class InscricaoService extends Component {

  
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

  static getAll() {
    return axios(InscricaoService._withBaseUrl("eventos-inscricoes"));
  }

  static inscrever(eventoId, userId) {
    var formData = {
      eventoId,
      userId
    }
    var serviceObj = this.setObject(formData)
    return axios.post(InscricaoService._withBaseUrl("eventos-inscricoes/inscrever"), serviceObj, headerJwt);
  }

  static desinscrever(eventoId, userId) {
    var formData = {
      eventoId,
      userId
    }
    var serviceObj = this.setObject(formData)
    return axios.post(InscricaoService._withBaseUrl("eventos-inscricoes/desinscrever"), serviceObj, headerJwt);
  }

  static getByEventoId(eventoId) {
    return axios.get(InscricaoService._withBaseUrl(`eventos-inscricoes/${eventoId}`), headerJwt);
  }

  static getInscricoesByUserId(userId) {
    return axios.get(InscricaoService._withBaseUrl(`eventos-inscricoes/${userId}/user`), headerJwt);
  }

  static estevePresente(eventoId, userId) {
    var formData = {
      eventoId,
      userId
    }
    var serviceObj = this.setObject(formData)
    return axios.post(InscricaoService._withBaseUrl("eventos-inscricoes/esteve-presente"), serviceObj, headerJwt);
  }

}

export default InscricaoService



