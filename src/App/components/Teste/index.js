import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';

import Aux from "./../../../hoc/_Aux";
import Card from "./../../../App/components/MainCard";

import SigIn from "./../../components/Authentication/SignIn/SignIn1"
import SigUp from "./../../components/Authentication/SignUp/SignUp1"
import ForgotPassword from "./../../components/Authentication/ResetPassword/ResetPassword1"


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModalLogin: true,
            showModalSigUp: false,
            showModalForgotPassword: false,
        }
    };

    handleShowModalLogin = (e) => {
        e.preventDefault()
        this.setState({ showModalLogin: true });
    }

    handleCloseModalLogin = () => {
        this.setState({ showModalLogin: false });
    }

    handleShowModalForgotPassword = (e) => {
        e.preventDefault()
        this.setState({ showModalLogin: false });
        this.setState({ showModalForgotPassword: true });
    }

    handleCloseModalForgotPassword = () => {
        this.setState({ showModalForgotPassword: false });
    }

    handleShowModalSigUp = (e) => {
        e.preventDefault()
        this.setState({ showModalLogin: false });
        this.setState({ showModalForgotPassword: false });
        this.setState({ showModalSigUp: true });
    }

    handleCloseModalSigUp = () => {
        this.setState({ showModalSigUp: false });
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Hello Card' isOption>
                            <Modal show={this.state.showModalLogin} onHide={this.handleCloseModalLogin} style={{ textAlign: 'center' }}>
                                <SigIn LinksExternal={[
                                    { 'text': 'Forgot password or Active User ', 'name': 'Forgot Password', 'link': this.handleShowModalForgotPassword },
                                    { 'text': 'Don’t have an account?', 'name': 'Signup', 'link': this.handleShowModalSigUp }
                                ]} />
                            </Modal>
                            <Modal show={this.state.showModalForgotPassword} onHide={this.handleCloseModalForgotPassword} style={{ textAlign: 'center' }}> <ForgotPassword />
                                <a href="#" onClick={(e) => this.handleShowModalForgotPassword(e)}>esqueci minha senha</a>
                            </Modal>
                            <Modal show={this.state.showModalSigUp} onHide={this.handleCloseModalSigUp} style={{ textAlign: 'center' }}> <SigUp />
                                <a href="#" onClick={(e) => this.handleShowModalSigUp(e)}>Registrar</a>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Index;