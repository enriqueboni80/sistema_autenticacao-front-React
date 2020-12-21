import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, TextInputGroup, SelectGroup } from 'react-bootstrap4-form-validation';
import Service from "../../../../services/EventoService"
import CategoriaService from "../../../../services/EventoCategoriaService"
import Aux from "../../../../hoc/_Aux";
import { convertCurrencyPTtoUS, convertCurrencyUStoPT } from "../../../../helpers/convertCurrency"
import { convertDatePTtoUS, convertDateUStoPT, getTimeSplited } from "../../../../helpers/convertDate"

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
            categorias: []
        }
    };


    UNSAFE_componentWillMount() {
        this.getById(this.state.id)
        this.getCategorias()
        
    };


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
                <div>{this.state.name}</div>
                <div>{this.state.qtd_vagas}</div>
                <div>{this.state.palestrante}</div>
                <div>{this.state.detalhes}</div>
                <div>{this.state.descricao}</div>
                <div>{this.state.categoria}</div>
                <div>{this.state.gratuito}</div>
                <div>{this.state.preco}</div>
                <div>{this.state.privado}</div>
                <div>{this.state.data_inicio}</div>
                <div>{this.state.hora_inicio}</div>
                <div>{this.state.data_fim}</div>
                <div>{this.state.hora_fim}</div>
                <div>{this.state.prazo_inscricao}</div>
                <div>{this.state.hora_fim_prazo_inscricao}</div>
            </Aux>
        );
    }
}

export default Create;
