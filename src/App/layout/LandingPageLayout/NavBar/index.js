import React from 'react';
import { Modal } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';

import SigIn from './../../../components/Authentication/SignIn/SignIn1'
import SigUp from './../../../components/Authentication/SignUp/SignUp1'
import ForgotPassword from './../../../components/Authentication/ResetPassword/ResetPassword1'

import CONSTANT from '../../../../store/constant'
import { Link } from 'react-router-dom'


class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModalSigIn: false,
            showModalSigUp: false,
            showModalForgotPassword: false,
            isAuthenticated: false,
            loggedUser: ''
        }
    };

    UNSAFE_componentWillMount() {
        this.checkIsAuth()
    }

    checkIsAuth = async () => {
        if (localStorage.getItem('user_session')) {
            this.setState({ isAuthenticated: true })
            this.setState({ loggedUser: JSON.parse(localStorage.getItem('user_session')) })
        }
    }

    logOut = () => {
        localStorage.removeItem('user_session')
        this.setState({ username: 'não logado' })
        window.location.href = "/"
    }

    handleShowModalSigIn = (e) => {
        e.preventDefault()
        this.setState({ showModalSigIn: true });
        this.setState({ showModalSigUp: false });
        this.setState({ showModalForgotPassword: false });
    }

    handleCloseModalSigIn = () => {
        this.setState({ showModalSigIn: false });
    }

    handleShowModalForgotPassword = (e) => {
        e.preventDefault()
        this.setState({ showModalSigIn: false });
        this.setState({ showModalSigUp: false });
        this.setState({ showModalForgotPassword: true });
    }

    handleCloseModalForgotPassword = () => {
        this.setState({ showModalForgotPassword: false });
    }

    handleShowModalSigUp = (e) => {
        e.preventDefault()
        this.setState({ showModalSigIn: false });
        this.setState({ showModalForgotPassword: false });
        this.setState({ showModalSigUp: true });
    }

    handleCloseModalSigUp = () => {
        this.setState({ showModalSigUp: false });
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top past-main" role="navigation">
                <div className="container">
                    <a className="navbar-brand-2 page-scroll" href="/"><img src={logo} alt="Datta Able Logo" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto" />
                        <ul className="navbar-nav my-2 my-lg-0">

                            {
                                this.state.isAuthenticated
                                    ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link page-scroll" to={`/meus-ingressos/${this.state.loggedUser.id}`}>Meus Ingresso</Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <NavLink to="#!" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{this.state.loggedUser.username}</NavLink>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {this.state.loggedUser.grupos == CONSTANT.ADMINISTRATORS ? <NavLink to='/home' className="dropdown-item">Painel Administrativo</NavLink> : ""}
                                                <NavLink to="#" className="dropdown-item" onClick={this.logOut}>LogOut</NavLink>
                                            </div>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="#" className="nav-link page-scroll" onClick={(e) => this.handleShowModalSigIn(e)}>Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="#" className="nav-link page-scroll" onClick={(e) => this.handleShowModalSigUp(e)}>Criar Conta</NavLink>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
                <Modal size="lg" show={this.state.showModalSigIn} onHide={this.handleCloseModalSigIn} style={{ textAlign: 'center' }}>
                    <SigIn LinksExternal={[
                        { 'text': 'Forgot password or Active User ', 'name': 'Forgot Password', 'link': this.handleShowModalForgotPassword },
                        { 'text': 'Don’t have an account?', 'name': 'Signup', 'link': this.handleShowModalSigUp }
                    ]} />
                </Modal>
                <Modal size="lg" show={this.state.showModalForgotPassword} onHide={this.handleCloseModalForgotPassword} style={{ textAlign: 'center' }}>
                    <ForgotPassword LinksExternal={[
                        { 'text': 'Allready have an account?', 'name': 'Login', 'link': this.handleShowModalSigIn },
                        { 'text': 'Don’t have an account?', 'name': 'Signup', 'link': this.handleShowModalSigUp }
                    ]}
                    />
                </Modal>
                <Modal size="lg" show={this.state.showModalSigUp} onHide={this.handleCloseModalSigUp} style={{ textAlign: 'center' }}>
                    <SigUp LinksExternal={[
                        { 'text': 'Forgot password or Active User ', 'name': 'Forgot Password', 'link': this.handleShowModalForgotPassword },
                        { 'text': 'Allready have an account?', 'name': 'Login', 'link': this.handleShowModalSigIn },
                    ]} />
                </Modal>
            </nav>
        )
    }
}

export default Navigation