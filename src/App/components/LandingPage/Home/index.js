import React, { Component } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';

import Aux from "./../../../../hoc/_Aux";
/* import Card from "./../../../../App/components/MainCard"; */

import EventoService from "./../../../../services/EventoService"
import InscricaoService from "./../../../../services/InscricaoService"
import SigIn from './../../../components/Authentication/SignIn/SignIn1'
import SigUp from './../../../components/Authentication/SignUp/SignUp1'
import ForgotPassword from './../../../components/Authentication/ResetPassword/ResetPassword1'

import { convertCurrencyUStoPT } from "../../../../helpers/convertCurrency"
import { convertDateUStoPT, getTimeSplited } from "../../../../helpers/convertDate"

import { Link } from 'react-router-dom'

class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loggedUser: '',
            eventos: [],
            eventosInscritos: [],
            inscrito: false,
            isAuthenticated: false,
            showModalSigIn: false,
            showModalSigUp: false,
            showModalForgotPassword: false
        }
    };

    UNSAFE_componentWillMount() {
        this.getTodosEventos()
        this.checkIsAuth()
    }


    getTodosEventos = async () => {
        EventoService.getAll().then((res) => {
            this.setState({ 'eventos': res.data })
        })
    }

    checkIsAuth = async () => {
        if (localStorage.getItem('user_session')) {
            this.setState({ isAuthenticated: true })
            this.setState({ loggedUser: JSON.parse(localStorage.getItem('user_session')) })
        }
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
            <Aux>
                <Row>
                    {this.state.eventos.map((evento) => {
                        if (evento.publicado) {
                            return (
                                <Col md={6} xl={3} key={evento.id}>
                                    <Link to={`evento/${evento.id}`} className="btn btn-block">
                                        <Card style={{border: 'none'}}>
                                            <Card.Body style={{ textAlign: "left" }}>
                                                <Card.Img src={evento.url_imagem ? evento.url_imagem : `${process.env.REACT_APP_FRONTEND_SERVER_URL}/images/evento-padrao-img.png`} />
                                                <h5 style={{ fontSize: "13px", color: "Red", fontWeight: "bold" }} className="m-t-10">Dia {convertDateUStoPT(evento.data_inicio)} as {getTimeSplited(evento.data_inicio)}</h5>
                                                <h5 style={{ fontSize: "20px" }} className="m-t-5">{evento.name}</h5>
                                                <span className="text-muted d-block m-b-30">{evento.detalhes}</span>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        }
                    })}
                </Row>
            </Aux>
        );
    }
}

export default Index;


