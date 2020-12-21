import React from 'react';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import Service from "../../../../services/InscricaoService"
import EventoService from "../../../../services/EventoService"
import Aux from "../../../../hoc/_Aux";
import { convertDatePTtoUS, convertDateUStoPT, getTimeSplited } from "../../../../helpers/convertDate"
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa"


class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            eventoId: this.props.match.params.id,
            evento: '',
            dataCollection: [],
            estevePresente: false,
            check1: false
        }
    };


    UNSAFE_componentWillMount() {
        this.getInscritosPorEvento(this.state.eventoId)
        this.getByEventoId(this.state.eventoId)
    };

    getByEventoId = async (eventoId) => {
        var evento = await EventoService.getById(eventoId)
        this.setState({ evento: evento.data })
    }

    getInscritosPorEvento = (eventoId) => {
        Service.getByEventoId(eventoId).then((_dataCollection) => {
            this.setState({ dataCollection: _dataCollection.data })
        })
    }

    estevePresente = (userId, chaveador) => {
        Service.estevePresente(this.state.eventoId, userId).then(() => {
            this.getInscritosPorEvento(this.state.eventoId)
        })
    }


    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <div class="card-header">
                                    <h5>{this.state.evento.name}</h5>
                                    <span class="d-block m-t-5">
                                        <b>Inicio</b>: {convertDateUStoPT(this.state.evento.data_inicio)} as: {getTimeSplited(this.state.evento.data_inicio)}
                                    </span>
                                    <span class="d-block m-t-5">
                                        <b>Fim:</b> {convertDateUStoPT(this.state.evento.data_inicio)} as: {getTimeSplited(this.state.evento.data_fim)}
                                    </span>
                                    <span class="d-block m-t-5">
                                        <b>Prazo Inscrição:</b> {convertDateUStoPT(this.state.evento.prazo_inscricao)} as: {getTimeSplited(this.state.evento.prazo_inscricao)}
                                    </span>
                                </div>
                            </Card.Header>
                            <div class="card-block table-border-style">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>Data Inscricao</th>
                                                <th style={{ textAlign: 'center' }}>Esteve Presente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataCollection.map(user => {
                                                return (
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{convertDateUStoPT(user.data_inscricao)} as {getTimeSplited(user.data_inscricao)}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {user.esteve_presente
                                                                ? <FaRegCheckSquare onClick={() => this.estevePresente(user.id, true)} />
                                                                : <FaRegSquare onClick={() => this.estevePresente(user.id, false)} />
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </Aux>


        );
    }
}

export default Index;

