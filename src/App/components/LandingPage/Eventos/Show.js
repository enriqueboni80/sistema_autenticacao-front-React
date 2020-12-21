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

import { Link } from 'react-router-dom'

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            qtd_vagas: "",
            palestrante: "",
            url_imagem: "",
            detalhes: "",
            descricao: "",
            categoria: "",
            publicado: false,
            gratuito: false,
            preco: "",
            privado: false,
            cancelado: false,
            data_inicio: "",
            hora_inicio: "",
            data_fim: "",
            hora_fim: "",
            prazo_inscricao: "",
            hora_fim_prazo_inscricao: "",
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
        let inscricoes = await InscricaoService.getInscricoesByUserId(usuarioAutenticado.id)
        let jaInscrito = false
        inscricoes.data.map(inscricao => {
            if (inscricao.evento_id === this.state.id) {
                jaInscrito = true
            }
        })
        if (jaInscrito) {
            this.setState({ inscrito: true })
            return true
        }
        return false
    }

    inscricaoEvento = async (e) => {
        e.preventDefault()
        let jaInscrito = await this.checkJaInscritoNoEvento()
        if (!jaInscrito) {
            InscricaoService.inscrever(this.state.id, this.state.loggedUser.id).then((res) => {
                this.setState({ inscrito: true })
                window.location.href = `/meus-ingressos/${this.state.loggedUser.id}`
            })
        }
        window.location.href = `/meus-ingressos/${this.state.loggedUser.id}`
    }

    desinscricaoEvento = async () => {
        InscricaoService.desinscrever(this.state.id, this.state.loggedUser.id).then((res) => {
            this.setState({ inscrito: false })
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
                id: _dataReturned.data.id,
                name: _dataReturned.data.name,
                qtd_vagas: _dataReturned.data.qtd_vagas,
                palestrante: _dataReturned.data.palestrante,
                url_imagem: _dataReturned.data.url_imagem,
                detalhes: _dataReturned.data.detalhes,
                descricao: _dataReturned.data.descricao,
                categoria: _dataReturned.data.categoria,
                publicado: _dataReturned.data.publicado,
                gratuito: _dataReturned.data.gratuito,
                preco: _dataReturned.data.preco ? convertCurrencyUStoPT(_dataReturned.data.preco) : "",
                privado: _dataReturned.data.privado,
                cancelado: _dataReturned.data.cancelado,
                data_inicio: _dataReturned.data.data_inicio ? convertDateUStoPT(_dataReturned.data.data_inicio) : "",
                hora_inicio: _dataReturned.data.data_inicio ? getTimeSplited(_dataReturned.data.data_inicio) : "",
                data_fim: _dataReturned.data.data_fim ? convertDateUStoPT(_dataReturned.data.data_fim) : "",
                hora_fim: _dataReturned.data.data_fim ? getTimeSplited(_dataReturned.data.data_fim) : "",
                prazo_inscricao: _dataReturned.data.prazo_inscricao ? convertDateUStoPT(_dataReturned.data.prazo_inscricao) : "",
                hora_fim_prazo_inscricao: _dataReturned.data.prazo_inscricao ? getTimeSplited(_dataReturned.data.prazo_inscricao) : ""
            })
        })
    }


    getCategorias = () => {
        CategoriaService.getAll().then((_categorias) => {
            this.setState({ categorias: _categorias.data })
        })
    }

    render() {
        return (
            <Aux>
                <Col style={{ margin: "auto" }} md={7} xl={7} key={this.state.id}>
                    <Card>
                        <Card.Body>
                            <Card.Img src={this.state.url_imagem ? this.state.url_imagem : `${process.env.REACT_APP_FRONTEND_SERVER_URL}/images/evento-padrao-img.png`} />
                            <h5 className="m-t-35">{this.state.name}</h5>
                            <span className="text-muted d-block m-b-30">{this.state.descricao}</span>
                            <p className="border-top m-b-20 p-t-10 m-t-20"></p>
                            <div className="row" style={{ textAlign: "center" }}>
                                <div className="col">
                                    <h5>R$ {this.state.preco ? this.state.preco : ''} </h5>
                                    <span>Investimento</span>
                                </div>
                                <div className="col">
                                    <h5>{this.state.prazo_inscricao}</h5>
                                    <span>Prazo Inscrição</span>
                                </div>

                            </div>
                            <div className="row m-t-30" style={{ margin: "30px auto 1px" }}>
                                <div className="col-6 p-r-0">


                                    {this.state.isAuthenticated && this.state.inscrito
                                        ? <a href='#' className="btn btn-primary text-uppercase btn-block" onClick={(e) => this.desinscricaoEvento(e)}>Desinscrever</a>
                                        : this.state.isAuthenticated ? <a href='#' className="btn btn-primary text-uppercase btn-block" onClick={(e) => this.inscricaoEvento(e)}>Inscrever</a>
                                            : <a href='#' className="btn text-uppercase border btn-block btn-outline-secondary" onClick={(e) => this.handleShowModalSigIn(e)}>Inscrever</a>
                                    }
                                </div>
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
