import React from 'react';
import { NavLink } from 'react-router-dom';
import UserService from "../../../../services/UserService"

import './../../../../assets/scss/style.scss';
import Aux from "./../../../../hoc/_Aux";
import Breadcrumb from "./../../../../App/layout/AdminLayout/Breadcrumb"

import SendMailForm from "./SendMailForm"
import TokenConfirmationForm from "./TokenConfirmationForm"
import ChangePasswordForm from "./ChangePasswordForm"

class ResetPassword1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activation_token: '',
            password: '',
            userId: '',
            step: 0
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    matchPassword = (value) => {
        return value && value === this.state.password;
    }

    handleSubmitEmail = (e) => {
        e.preventDefault()
        var formData = {
            email: e.target.email.value,
        }
        UserService.forgotPassword(formData).then((response) => {
            alert('Email de recuperação enviado com sucesso')
            this.setState({ userId: response.data.userId })
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
            userId: this.state.userId,
            activation_token: this.state.activation_token
        }
        UserService.validateToken(formData).then(() => {
            alert('usuario encontrado')
            this.setState({ step: 2 })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.error)
            }
        })
    }

    handleSubmitChangePassword = (e) => {
        e.preventDefault()
        var formData = {
            userId: this.state.userId,
            activation_token: this.state.activation_token,
            password: this.state.password
        }
        UserService.changePassword(formData).then(() => {
            alert('Senha trocada com sucesso')
            window.location.href('/')
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
                                <div className="mb-4">
                                    <i className="feather icon-mail auth-icon" />
                                </div>
                                {this.state.step === 0 ? <SendMailForm handleSubmitEmail={this.handleSubmitEmail} handleChange={this.handleChange} />
                                    : this.state.step === 1 ? <TokenConfirmationForm handleSubmitToken={this.handleSubmitToken} handleChange={this.handleChange} />
                                        : this.state.step === 2 ? <ChangePasswordForm handleSubmitChangePassword={this.handleSubmitChangePassword} handleChange={this.handleChange} matchPassword={this.matchPassword} />
                                            : "Erro"
                                }
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default ResetPassword1;