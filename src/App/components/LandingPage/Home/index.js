import React, { Component } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';

import Aux from "./../../../../hoc/_Aux";
/* import Card from "./../../../../App/components/MainCard"; */

import EventoService from "./../../../../services/EventoService"
import InscricaoService from "./../../../../services/InscricaoService"
import SigIn from './../../../components/Authentication/SignIn/SignIn1'

import { convertCurrencyUStoPT } from "../../../../helpers/convertCurrency"
import { convertDateUStoPT } from "../../../../helpers/convertDate"

class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loggedUser: '',
            eventos: [],
            showModalSigIn: false,
            eventosInscritos: [],
            inscrito: false,
            isAuthenticated:false
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

    inscricaoEvento = async (eventoId) => {
        let inscricoes = await InscricaoService.getInscricoesByUserId(this.state.loggedUser.id)
        let jaInscrito = false
        inscricoes.data.map(inscricao => {
            if(inscricao.evento_id === eventoId) {
                jaInscrito = true
            }
        })
        if(!jaInscrito){
            InscricaoService.inscrever(eventoId, this.state.loggedUser.id).then((res) => {
                this.setState({inscrito: true})
            })
        }
    }

    desinscricaoEvento = async (eventoId) => {
        InscricaoService.desinscrever(eventoId, this.state.loggedUser.id).then((res) => {
            this.setState({inscrito: false})
        })
    }

    handleShowModalSigIn = (e) => {
        e.preventDefault()
        this.setState({ showModalSigIn: true });
    }

    render() {
        return (
            <Aux>
                <Row>
                    {this.state.eventos.map((evento) => {
                        if (evento.publicado) {
                            return (
                                <Col md={6} xl={4} key={evento.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Img src={evento.url_imagem ? evento.url_imagem : `${process.env.REACT_APP_FRONTEND_SERVER_URL}/images/evento-padrao-img.png`} />
                                            <h5 className="m-t-35">{evento.name}</h5>
                                            <span className="text-muted d-block m-b-30">{evento.descricao}</span>
                                            <p className="border-top m-b-20 p-t-10 m-t-20"></p>
                                            <div className="row" style={{ textAlign: "center" }}>
                                                <div className="col">
                                                    <h5>R$ {evento.preco ? convertCurrencyUStoPT(evento.preco) : ''} </h5>
                                                    <span>Investimento</span>
                                                </div>
                                                <div className="col">
                                                    <h5>{convertDateUStoPT(evento.prazo_inscricao)}</h5>
                                                    <span>Prazo Inscrição</span>
                                                </div>

                                            </div>
                                            <div className="row m-t-30" style={{ margin: "30px auto 1px" }}>                                                
                                                <div className="col-6 p-r-0">
                                                {this.state.isAuthenticated 
                                                ? <a href='#' className="btn btn-primary text-uppercase btn-block" onClick={() => this.inscricaoEvento(evento.id)}>Inscrever</a>
                                                :<a href='#' className="btn text-uppercase border btn-block btn-outline-secondary" onClick={(e) => this.handleShowModalSigIn(e)}>Inscrever</a>}
                                                <a href='#' className="btn btn-primary text-uppercase btn-block" onClick={() => this.desinscricaoEvento(evento.id)}>desinscrever (Provisório)</a>
                                                </div>
                                                <div className="col-6">
                                                    <a href='#' className="btn text-uppercase border btn-block btn-outline-secondary">Ver Detalhes</a>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>
                    <Modal size="lg" show={this.state.showModalSigIn} onHide={this.handleCloseModalSigIn} style={{ textAlign: 'center' }}>
                            <SigIn LinksExternal={[
                            { 'text': 'Forgot password or Active User ', 'name': 'Forgot Password', 'link': this.handleShowModalForgotPassword },
                            { 'text': 'Don’t have an account?', 'name': 'Signup', 'link': this.handleShowModalSigUp }]} /> 
                    </Modal>
            </Aux>
        );
    }
}

export default Index;


