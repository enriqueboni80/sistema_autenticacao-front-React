import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Service from "../../../services/EventoService"
import InscricaoService from "../../../services/InscricaoService"
import Aux from "../../../hoc/_Aux";
import { convertCurrencyUStoPT } from "../../../helpers/convertCurrency"
import { convertDateUStoPT, getTimeSplited } from "../../../helpers/convertDate"

class Show extends React.Component {

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
            total_inscricoes: 0,
            perc_taxa_ocupacao: 0
        }
    };


    UNSAFE_componentWillMount() {
        this.getById(this.state.id)
        this.getTotaldeInscricoesByEvento(this.state.id)
    };

    getTotaldeInscricoesByEvento = async (eventoId) => {
        await InscricaoService.getByEventoId(eventoId).then(_dataReturned => {
            this.setState({ total_inscricoes: parseInt(_dataReturned.data.length) })
            this.setState({ perc_taxa_ocupacao: this.state.total_inscricoes / this.state.qtd_vagas * 100 })
        })

    }


    getById = async (eventoId) => {
        let _dataReturned = await Service.getById(eventoId)
        this.setState({
            id: _dataReturned.data.id,
            name: _dataReturned.data.name,
            qtd_vagas: parseInt(_dataReturned.data.qtd_vagas),
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
    }


    render() {
        return (
            <Aux>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5"><b>{this.state.name}</b> - Palestrante: {this.state.palestrante} </Card.Title>
                                <span style={{ fontSize: "13px", color: "Red", fontWeight: "bold" }} className="d-block m-t-10">
                                    Inicio: {this.state.data_inicio} as {this.state.hora_inicio} <br />
                                fim: {this.state.data_fim} as {this.state.hora_fim}<br />
                                Prazo Inscricao: {this.state.prazo_inscricao} as {this.state.hora_fim_prazo_inscricao}
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <div>Quantidade de vagas: {this.state.qtd_vagas}</div>
                                <div>Total de inscrições: {this.state.total_inscricoes}</div>
                                {this.state.gratuito ? '* EVENTO GRATUITO *' : this.state.preco ? 'Valor: R$ ' + this.state.preco : ''}
                                <br />
                                <div>
                                    <div>Taxa de Ocupação</div>
                                    <div data-label={`${this.state.perc_taxa_ocupacao}%`} className={`radial-bar radial-bar-${this.state.perc_taxa_ocupacao < 5 ? 0 : this.state.perc_taxa_ocupacao} radial-bar-lg radial-bar-success m-r-5`} />
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Show;
