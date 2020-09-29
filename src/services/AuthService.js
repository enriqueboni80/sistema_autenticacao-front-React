import axios from "axios";
/* require('dotenv').config() */

class AuthService {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      /* Verificar pq o token agora esta dentro do user (dentro do localstorage) 'Authorization': 'Bearer ' + localStorage.getItem('jwttoken') */
    }
  };

  static setObject = (formData) => {
    return {
      "id": formData.userId,
      "username": formData.name,
      "email": formData.email,
      "password": formData.password,
      "activationtoken": formData.activation_token
    }
  }

  static _withBaseUrl(path = "") {
    const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
    return `${API_SERVER_URL}/auth/${path}`;
  }

  static getValues() {
    return axios(AuthService._withBaseUrl("login"));
  }

  static register(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(AuthService._withBaseUrl("register"), serviceObj, this.CONFIG)
  }

  static validateToken(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(AuthService._withBaseUrl("register/validate"), serviceObj)
  }

  static login(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(AuthService._withBaseUrl("login"), serviceObj)
  }

  static forgotPassword(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(AuthService._withBaseUrl("forgot-password"), serviceObj)
  }

  static changePassword(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(AuthService._withBaseUrl("forgot-password/reset"), serviceObj)
  }

  static checkEmailFree(email){
    let serviceObj = {
      email : email
    }
    return axios.post(AuthService._withBaseUrl("register/checkemailfree"), serviceObj)
  }

}

export default AuthService
