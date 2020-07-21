import axios from "axios";
/* require('dotenv').config() */

class UserService {

  static CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      /* 'Authorization': 'Bearer ' + localStorage.getItem('jwttoken') */
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
    return `http://localhost:3000/${path}`;
  }

  static getValues() {
    return axios(UserService._withBaseUrl("login"));
  }

  static register(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(UserService._withBaseUrl("register"), serviceObj, this.CONFIG)
  }

  static validateToken(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(UserService._withBaseUrl("register/validate"), serviceObj)
  }

  static login(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(UserService._withBaseUrl("login"), serviceObj)
  }

  static forgotPassword(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(UserService._withBaseUrl("forgot-password"), serviceObj)
  }

  static changePassword(formData) {
    var serviceObj = this.setObject(formData)
    return axios.post(UserService._withBaseUrl("forgot-password/reset"), serviceObj)
  }

  static checkEmailFree(email){
    let serviceObj = {
      email : email
    }
    return axios.post(UserService._withBaseUrl("register/checkemailfree"), serviceObj)
  }

}

export default UserService
