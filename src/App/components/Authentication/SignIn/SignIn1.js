import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../../assets/scss/style.scss';
import Aux from "./../../../../hoc/_Aux";
import Breadcrumb from "./../../../../App/layout/AdminLayout/Breadcrumb"

import UserService from "../../../../services/UserService"
import SignInForm from "./SignInForm"

import ReturnMessage from "../ReturnMessage"


class SignIn1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            returnMessage: '',
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault()
        var formData = {
            email: this.state.email,
            password: this.state.password
        }

        UserService.login(formData).then((response) => {
            /* JWTToken esta dentro do usuario */
            localStorage.removeItem('user_session');
            localStorage.setItem('user_session', JSON.stringify(response.data.user));
            window.location.href = "/home";
        }).catch((error) => {
            if (error.response.data.validated === false) {
                this.setState({ returnMessage: { type: "error", message: "Usuário não validado" } })
            } else {
                this.setState({ returnMessage: { type: "error", message: "Senha ou Usuário Inválidos" } })
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
                                        : <SignInForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                                }
                                <p className="mb-0 text-muted">Forgot password or Active User <NavLink to="/auth/reset-password">Reset or Active</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux >
        );
    }
}

export default SignIn1;