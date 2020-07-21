import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../../assets/scss/style.scss';
import Aux from "./../../../../hoc/_Aux";
import Breadcrumb from "./../../../../App/layout/AdminLayout/Breadcrumb"
/* import DEMO from "../../../store/constant"; */

import UserService from "../../../../services/UserService"
import SignUpForm from "./SignUpForm"
import ActivationForm from "./ActivationForm"

class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            newUserId: '',
            activation_token: '',
            canIRegisterNewEmail: true,
            step: 0
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    checkEmailFree = (value) => {
        UserService.checkEmailFree(value).then((response) => {
            console.log(response)
            if (response.data.success) {
                this.setState({ canIRegisterNewEmail: true })
            } else {
                this.setState({ canIRegisterNewEmail: false })
            }
        });
        if (!this.state.canIRegisterNewEmail) {
            return false
        }
        return true
    }

    matchPassword = (value) => {
        return value && value === this.state.password;
    }

    handleSubmit = (e) => {
        console.log(this.state.username)
        e.preventDefault()
        var formData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        UserService.register(formData).then((response) => {
            alert('Cadastrado com sucesso!!!!!!!!!!!!!!!!!')
            this.setState({ newUserId: response.data.userId })
            this.setState({ step: 1 })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.error)
            }
        })
    }

    handleSubmitToken = (e) => {
        e.preventDefault()
        var formData = {
            userId: this.state.newUserId,
            activation_token: this.state.activation_token
        }
        UserService.validateToken(formData).then((response) => {
            alert('token validado com sucesso')
            window.location.href = "/login";
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.error)
            }
        })
    }


    render() {
        return (
            <Aux>
                <Breadcrumb />
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                {
                                    this.state.step === 0
                                        ? <SignUpForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} checkEmailFree={this.checkEmailFree} matchPassword={this.matchPassword} />
                                        : this.state.step === 1 ? <ActivationForm handleSubmitToken={this.handleSubmitToken} handleChange={this.handleChange} />
                                            : "vazio"
                                }
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin">Login</NavLink></p>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin">Ativar o Token</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;