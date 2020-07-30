import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from "../../../../services/AuthService"

import './../../../../assets/scss/style.scss';
import Aux from "./../../../../hoc/_Aux";
import Breadcrumb from "./../../../../App/layout/AdminLayout/Breadcrumb"

import SendMailForm from "./SendMailForm"
import TokenConfirmationForm from "./TokenConfirmationForm"
import ChangePasswordForm from "./ChangePasswordForm"
import ReturnMessage from "../ReturnMessage"

class ResetPassword1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activation_token: '',
            password: '',
            userId: '',
            returnMessage: '',
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
        AuthService.forgotPassword(formData).then((response) => {
            this.setState({ userId: response.data.userId })
            this.setState({ step: 1 })
        }).catch((error) => {
            if (error.response) {
                this.setState({ returnMessage: { type: "error", message: "Esse email não existe no sistema" } })
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
        AuthService.validateToken(formData).then(() => {
            this.setState({ step: 2 })
        }).catch((error) => {
            if (error.response) {
                this.setState({ returnMessage: { type: "error", message: "Token não validado" } })
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
        AuthService.changePassword(formData).then(() => {
            this.setState({ returnMessage: { type: "success", message: "Senha Trocada, Pode Logar!" } })
            window.location.href('/')
        }).catch((error) => {
            if (error.response) {
                this.setState({ returnMessage: { type: "warning", message: "Algo errado aconteceu!" } })
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
                                    this.state.returnMessage ? <ReturnMessage returnMessage={this.state.returnMessage} />
                                        : this.state.step === 0 ? <SendMailForm handleSubmitEmail={this.handleSubmitEmail} handleChange={this.handleChange} />
                                            : this.state.step === 1 ? <TokenConfirmationForm handleSubmitToken={this.handleSubmitToken} handleChange={this.handleChange} />
                                                : this.state.step === 2 ? <ChangePasswordForm handleSubmitChangePassword={this.handleSubmitChangePassword} handleChange={this.handleChange} matchPassword={this.matchPassword} />
                                                    : "Erro"
                                }
                                {this.props.LinksExternal
                                    ?
                                    this.props.LinksExternal.map((linkExternal) => {
                                        return (
                                            <p className="mb-0 text-muted">{linkExternal.text} <a href="#" onClick={linkExternal.link}><b>{linkExternal.name}</b></a></p>
                                        )
                                    })
                                    :
                                    <>
                                        <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin">Login</NavLink></p>
                                        <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default ResetPassword1;