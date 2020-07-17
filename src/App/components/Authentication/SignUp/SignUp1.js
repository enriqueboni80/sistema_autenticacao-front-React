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
            newUserId: '',
            step: 0
        }
    };

    handleSubmit = (e) => {
        e.preventDefault()
        var formData = {
            name: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        UserService.register(formData).then((response) => {
            console.log(response)
            if (response) {
                alert('Cadastrado com sucesso')
                this.setState({ newUserId: response.data.userId })
                this.setState({ step: 1 })
            } else {
                alert('Erro ao Cadastrar')
            }
        })
    }

    handleSubmitToken = (e) => {
        e.preventDefault()
        var formData = {
            userId: this.state.newUserId,
            token: e.target.activation_token.value
        }
        UserService.validateToken(formData).then((response) => {
            console.log(response)
            if (response) {
                alert('token validado com sucesso')
                window.location.href = "/login";
            } else {
                alert('Erro ao Cadastrar')
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
                                        ? <SignUpForm handleSubmit={this.handleSubmit} />
                                        : this.state.step === 1 ? <ActivationForm handleSubmitToken={this.handleSubmitToken} />
                                            : "vazio"
                                }
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