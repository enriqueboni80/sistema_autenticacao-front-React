import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Service from "../../../../services/InscricaoService"
import EventoService from "../../../../services/EventoService"
import Aux from "../../../../hoc/_Aux";
import { convertDateUStoPT, getTimeSplited } from "../../../../helpers/convertDate"
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa"
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { saveAs } from 'file-saver'


class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            eventoId: this.props.match.params.id,
            evento: '',
            dataCollection: [],
            estevePresente: false
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

    geraCrachas = () => {
        if (this.state.dataCollection.length > 0) {
            this.state.dataCollection.forEach(user => {
                var blob = new Blob(
                    [
                        `${this.state.evento.name}
                        ${user.username}`
                    ],
                    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                saveAs(blob, `${user.username}_${this.state.evento.name}_CRACHA.doc`);
            })
        } else {
            alert('nao houveram inscritos nesse evento')
        }

    }

    geraCertificados = () => {
        var houveAlgumaPresenca = false
        this.state.dataCollection.forEach(user => {
            if (user.esteve_presente) {
                houveAlgumaPresenca = true
                var blob = new Blob(
                    [
                        `${user.username} participou do evento ${this.state.evento.name}`
                    ],
                    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                saveAs(blob, `${user.username}_${this.state.evento.name}_CERTIFICADO.doc`);
            }
        })
        if (!houveAlgumaPresenca) {
            alert('nao houveram inscritos nesse evento')
        }
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
                                    <br />
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-primary"
                                        table="table-to-xls"
                                        filename={this.state.evento.name}
                                        sheet={this.state.evento.name}
                                        buttonText="Exportar lista de Presença"
                                    />
                                    <button className="btn btn-primary" onClick={() => this.geraCrachas()}>Gera Crachas em Lote</button>
                                    <button className="btn btn-primary" onClick={() => this.geraCertificados()}>Gera Certificados em Lote</button>
                                </div>
                            </Card.Header>
                            <div class="card-block table-border-style">
                                <div class="table-responsive">
                                    <table class="table" id="table-to-xls">
                                        <thead>
                                            <tr style={{ display: 'None' }}>Evento: {this.state.evento.name}</tr>
                                            <tr style={{ display: 'None' }}>Inicio: {convertDateUStoPT(this.state.evento.data_inicio)} as: {getTimeSplited(this.state.evento.data_inicio)}</tr>
                                            <tr style={{ display: 'None' }}>Fim: {convertDateUStoPT(this.state.evento.data_inicio)} as: {getTimeSplited(this.state.evento.data_fim)}</tr>
                                            <tr style={{ display: 'None' }}>Prazo Inscricao: {convertDateUStoPT(this.state.evento.prazo_inscricao)} as: {getTimeSplited(this.state.evento.prazo_inscricao)}</tr>
                                            <tr>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>Data Inscricao</th>
                                                <th style={{ textAlign: 'center' }}>Compareceu ao Evento?</th>
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

