import React from 'react';
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, TextInputGroup, SelectGroup } from 'react-bootstrap4-form-validation';
import Service from "../../../../services/EventoService"
import CategoriaService from "../../../../services/EventoCategoriaService"
import InscricaoService from "./../../../../services/InscricaoService"
import Aux from "../../../../hoc/_Aux";
import { convertCurrencyPTtoUS, convertCurrencyUStoPT } from "../../../../helpers/convertCurrency"
import { convertDatePTtoUS, convertDateUStoPT, getTimeSplited } from "../../../../helpers/convertDate"

import SigIn from './../../../components/Authentication/SignIn/SignIn1'
import SigUp from './../../../components/Authentication/SignUp/SignUp1'
import ForgotPassword from './../../../components/Authentication/ResetPassword/ResetPassword1'

import { GrLocation } from 'react-icons/gr'
import { FaRegClock } from 'react-icons/fa'

import { Link } from 'react-router-dom'

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            evento: "",
            inscrito: false,
            categorias: [],
            isAuthenticated: false,
            loggedUser: '',
            showModalSigIn: false,
            showModalSigUp: false,
            showModalForgotPassword: false
        }
    };


    UNSAFE_componentWillMount() {
        this.checkIsAuth()
        this.getById(this.state.id)
        this.checkJaInscritoNoEvento()
        this.getCategorias()
    };


    checkIsAuth = async () => {
        if (localStorage.getItem('user_session')) {
            this.setState({ isAuthenticated: true })
            this.setState({ loggedUser: JSON.parse(localStorage.getItem('user_session')) })
            return JSON.parse(localStorage.getItem('user_session'))
        }
    }

    checkJaInscritoNoEvento = async () => {
        let usuarioAutenticado = await this.checkIsAuth()
        if (usuarioAutenticado) {
            let inscricoes = await InscricaoService.getInscricoesByUserId(usuarioAutenticado.id)
            let jaInscrito = false
            inscricoes.data.map(inscricao => {
                if (parseInt(inscricao.evento_id) == this.state.id) {
                    jaInscrito = true
                }
            })
            if (jaInscrito) {
                this.setState({ inscrito: true })
                return true
            }
            return false
        }
        return false
    }

    inscricaoEvento = async (e) => {
        e.preventDefault()
        let jaInscrito = await this.checkJaInscritoNoEvento()

        if (!jaInscrito) {
            let dadoGravado = await InscricaoService.inscrever(this.state.id, this.state.loggedUser.id)
            if (dadoGravado) {
                this.setState({ inscrito: true })
                window.location.href = `/meus-ingressos/${this.state.loggedUser.id}`
            }
        } else {
            window.location.href = `/meus-ingressos/${this.state.loggedUser.id}`
        }
    }

    desinscricaoEvento = async () => {
        InscricaoService.desinscrever(this.state.id, this.state.loggedUser.id).then((res) => {
            this.setState({ inscrito: false })
        })
    }

    getCategorias = () => {
        CategoriaService.getAll().then((_categorias) => {
            this.setState({ categorias: _categorias.data })
        })
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

    getById = (eventoId) => {
        Service.getById(eventoId).then((_dataReturned) => {
            this.setState({
                evento: _dataReturned.data
            })
        })

    }

    render() {
        return (
            <Aux>
                <Col style={{ margin: "auto" }} md={8} xl={8} key={this.state.evento.id}>
                    <Card>
                        <Card.Body>
                            <div style={{ width: '80%', margin: 'auto' }}>
                                <div style={{ textAlign: "center" }}>
                                    <Card.Img class="banner-principal" src={this.state.evento.url_imagem ? this.state.evento.url_imagem : `${process.env.REACT_APP_FRONTEND_SERVER_URL}/images/evento-padrao-img.png`} />
                                </div>
                            </div>
                            <div style={{ width: '100%', margin: 'auto' }}>
                                <Row className="m-t-35">
                                    <Col md={8} xl={8}>
                                        <h5 style={{ fontWeight: "bold", fontSize: '23px' }}>{this.state.evento.name}</h5>
                                        <span style={{ fontSize: "13px", color: "Red", fontWeight: "bold" }} className="d-block m-t-10"><FaRegClock size={12}/> Dia {convertDateUStoPT(this.state.evento.data_inicio)} as {getTimeSplited(this.state.evento.data_inicio)}</span>
                                        <span className="text-muted d-block m-t-5">
                                            <GrLocation size={13}/>{this.state.evento.rua ? ` ${this.state.evento.rua}, ` : ""}
                                            {this.state.evento.numero ? `${this.state.evento.numero}, ` : ""}
                                            {this.state.evento.complemento ? `${this.state.evento.complemento}, ` : ""}
                                            {this.state.evento.bairro ? `${this.state.evento.bairro}, ` : ""}
                                            {this.state.evento.cidade ? `${this.state.evento.cidade}. ` : ""}
                                        </span>
                                    </Col>
                                    <Col md={4} xl={4}>
                                        <h5 style={{ textAlign: "center", marginBottom: "7px", fontWeight: "bold" }}>
                                            {this.state.evento.gratuito ? '* EVENTO GRATUITO *' : this.state.evento.preco ? 'Valor: R$ ' + convertCurrencyUStoPT(this.state.evento.preco) : ''}
                                        </h5>
                                        <div>
                                            {this.state.isAuthenticated && this.state.inscrito
                                                ? <a href='#' className="btn btn-danger text-uppercase btn-block" onClick={(e) => this.desinscricaoEvento(e)}>Desinscrever</a>
                                                : this.state.isAuthenticated ? <a href='#' className="btn btn-primary text-uppercase btn-block" onClick={(e) => this.inscricaoEvento(e)}>Inscrever</a>
                                                    : <a href='#' className="btn btn-success text-uppercase btn-block" onClick={(e) => this.handleShowModalSigIn(e)}>Inscrever</a>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <p className="border-top m-b-20 p-t-10 m-t-20"></p>
                            <div className="text-muted d-block m-b-30" style={{ width: '95%', margin: 'auto' }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.evento.descricao
                                    }}></div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
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
            </Aux>
        );
    }
}

export default Create;
