import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Aux from "./../../../../hoc/_Aux";
/* import Card from "./../../../../App/components/MainCard"; */

import EventoService from "./../../../../services/EventoService"

import { convertCurrencyUStoPT } from "../../../../helpers/convertCurrency"
import { convertDateUStoPT } from "../../../../helpers/convertDate"

class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            eventos: []
        }
    };

    UNSAFE_componentWillMount() {
        this.getTodosEventos()
    }

    
    getTodosEventos = async () => {
        EventoService.getAll().then((res) => {
            this.setState({ 'eventos': res.data })
        })
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
                                                    <a href='#' className="btn btn-primary  text-uppercase btn-block">Inscrever</a>
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
            </Aux>
        );
    }
}

export default Index;


