import { Component } from "react";
import axios from "axios";

class EventoService extends Component {

  static CONFIG = {
    /*     headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwttoken')
        } */
  };

  static setObject = (formData) => {
    return {
      "name": formData.name,
      "description": formData.description,
      "duration": formData.duration === "" ? 0 : parseInt(formData.duration),
      "price": formData.price === "" ? 0 : parseFloat(formData.price),
      "percentage_commission": formData.percentage_commission === "" ? 0 : parseFloat(formData.percentage_commission),
      "fixed_commission": formData.fixed_commission === "" ? 0 : parseFloat(formData.fixed_commission),
      "type_commission": formData.type_commission === "" ? 0 : parseInt(formData.type_commission)
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

  /*   static create(formData) {
      var serviceObj = this.setObject(formData)
      return axios.post(ServiceService._withBaseUrl("eventos"), serviceObj, this.CONFIG)
    }
  
    static update(formData) {
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



