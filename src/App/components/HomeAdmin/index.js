import React, { Component } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

import EventoService from "../../../services/EventoService"
import InscricaoService from "../../../services/InscricaoService"
import { convertDateUStoPT } from "../../../helpers/convertDate"
import { Link } from 'react-router-dom'

import Aux from "../../../hoc/_Aux";
/* import Card from "../../../App/components/MainCard"; */

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventos: [],
            totalInscricoes: ""
        }
    };

    UNSAFE_componentWillMount() {
        this.getAllEventos()
        this.totalInscricoes()
    };

    getAllEventos = () => {
        EventoService.getAll().then((_dataCollection) => {
            _dataCollection.data.sort(function (a, b) {
                return (a.data_inicio > b.data_inicio) ? -1 : (a.data_inicio < b.data_inicio) ? 1 : 0
            });
            this.setState({ eventos: _dataCollection.data.reverse() })
        })
    }

    totalInscricoes = () => {
        InscricaoService.getAll().then(_dataCollection => {
            this.setState({totalInscricoes: _dataCollection.data.length})
        })
    }


    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Quantidade de Eventos</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">{this.state.eventos.length}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total de Inscricões</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">{this.state.totalInscricoes}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Media de Inscricões por evento</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">{this.state.totalInscricoes / this.state.eventos.length}</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Eventos Recentes</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        {this.state.eventos.map((data, key) => {
                                            return (
                                                <tr className="unread" key={key}>
                                                    <td>
                                                        <h6 className="mb-1">{data.name}</h6>
                                                        <p className="m-0">{data.detalhes}</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Inicio: {convertDateUStoPT(data.data_inicio)}</h6>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Fim: {convertDateUStoPT(data.data_fim)}</h6>
                                                    </td>
                                                    <td><Link to={`home/gerenciar-eventos/inscricoes/${data.id}`} className="label theme-bg2 text-white f-12">Lista de Inscritos</Link><Link to={`home/gerenciar-eventos/${data.id}`} className="label theme-bg text-white f-12">Mais Detalhes</Link></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Index;