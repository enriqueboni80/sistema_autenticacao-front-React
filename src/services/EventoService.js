import { Component } from "react";
import axios from "axios";

class EventoService extends Component {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      /*   'Authorization': 'Bearer ' + localStorage.getItem('jwttoken') */
    }
  };

  static setObject = (formData) => {
    return {
      "name": formData.name,
      "qtd_vagas": parseInt(formData.qtd_vagas),
      "palestrante": formData.palestrante,
      "url_imagem": formData.url_imagem,
      "detalhes": formData.detalhes,
      "descricao": formData.descricao,
      "categoria": parseInt(formData.categoria),
      "ativo": formData.ativo,
      "gratuito": formData.gratuito,
      "preco": formData.price === "" ? 0 : parseFloat(formData.preco),
      "privado": formData.privado,
      "cancelado": formData.cancelado,
      "data_inicio": formData.data_inicio,
      "data_fim": formData.data_fim,
      "prazo_inscricao": formData.prazo_inscricao
    }
  }

  static _withBaseUrl(path = "") {
    const BACKEND_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${BACKEND_SERVER_URL}/${path}`;
  }

  static getAll() {
    return axios(EventoService._withBaseUrl("eventos"));
  }

  static getById(id) {
    return axios.get(EventoService._withBaseUrl(`eventos/${id}`));
  }

  static create(formData) {
    var serviceObj = this.setObject(formData)
    console.log(serviceObj);
    return axios.post(EventoService._withBaseUrl("eventos/store"), serviceObj, this.CONFIG)
  }

  /*      static update(formData) {
      let id = formData.id
      var serviceObj = this.setObject(formData)
      return axios.put(ServiceService._withBaseUrl(`eventos/${id}`), serviceObj, this.CONFIG)
    }*/

  static delete(id) {
    return axios.delete(EventoService._withBaseUrl(`eventos/${id}/delete`), {
      "id": id
    })
  }
}

export default EventoService



