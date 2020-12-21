import React from 'react';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import Service from "../../../../services/InscricaoService"
import EventoService from "../../../../services/EventoService"
import Aux from "../../../../hoc/_Aux";
import { convertDatePTtoUS, convertDateUStoPT, getTimeSplited } from "../../../../helpers/convertDate"


class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            eventoId: this.props.match.params.id,
            evento: '',
            dataCollection: []
        }
    };


    UNSAFE_componentWillMount() {
        this.getInscritosPorEvento(this.state.eventoId)
        this.getByEventoId(this.state.eventoId)
    };

    getByEventoId = async (eventoId) => {
        var evento = await EventoService.getById(eventoId)
        console.log(evento);
        this.setState({ evento: evento.data })
    }

    getInscritosPorEvento = (eventoId) => {
        Service.getByEventoId(eventoId).then((_dataCollection) => {
            this.setState({ dataCollection: _dataCollection.data })
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
                                    <span class="d-block m-t-5">Inicio: {convertDateUStoPT(this.state.evento.data_inicio)} | Fim: {convertDateUStoPT(this.state.evento.data_fim)}</span>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataCollection.map(user => {
                                                return (
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
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

