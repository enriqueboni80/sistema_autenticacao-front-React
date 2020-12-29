import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, TextInputGroup, SelectGroup } from 'react-bootstrap4-form-validation';
import Service from "../../../services/EventoService"
import CategoriaService from "../../../services/EventoCategoriaService"
import Aux from "../../../hoc/_Aux";
import { convertCurrencyPTtoUS, convertCurrencyUStoPT } from "../../../helpers/convertCurrency"
import { convertDatePTtoUS, convertDateUStoPT, getTimeSplited } from "../../../helpers/convertDate"

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
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
            tel_contato: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: ''
        }
    };


    UNSAFE_componentWillMount() {
        this.getCategorias()
        this.getById()
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    descricaoChange = (value) => {
        this.setState({
            descricao: value
        })
    }

    toggleHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        })
    };

    handleSubmit = (event) => {
        event.preventDefault()
        var formData = {
            name: this.state.name,
            qtd_vagas: this.state.qtd_vagas,
            palestrante: this.state.palestrante,
            url_imagem: this.state.url_imagem,
            detalhes: this.state.detalhes,
            descricao: this.state.descricao,
            categoria: this.state.categoria,
            tel_contato: this.state.tel_contato,
            publicado: this.state.publicado ? true : false,
            gratuito: this.state.gratuito ? true : false,
            preco: convertCurrencyPTtoUS(this.state.preco),
            privado: this.state.privado ? true : false,
            cancelado: this.state.cancelado ? true : false,
            data_inicio: convertDatePTtoUS(this.state.data_inicio).concat(" ", this.state.hora_inicio),
            data_fim: convertDatePTtoUS(this.state.data_fim).concat(" ", this.state.hora_fim),
            prazo_inscricao: convertDatePTtoUS(this.state.prazo_inscricao).concat(" ", this.state.hora_fim_prazo_inscricao),
            endereco: {
                rua: this.state.rua,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cidade: this.state.cidade
            }
        }

        if (!this.props.id) {
            Service.create(formData).then(() => {
                this.props.handleCloseCreate()
                this.props.getAll()
            }).catch((errors) => {
                console.log(errors.response.data.error)
            })
        }

        if (!!this.props.id) {
            formData.id = this.state.id
            Service.update(formData).then(() => {
                this.props.handleCloseCreate()
                this.props.getAll()
            }).catch((errors) => {
                console.log(errors.response.data.error)
            })
        }

    }

    getById = () => {
        let id = this.props.id
        Service.getById(id).then((_dataReturned) => {
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
                tel_contato: _dataReturned.data.tel_contato,
                data_inicio: _dataReturned.data.data_inicio ? convertDateUStoPT(_dataReturned.data.data_inicio) : "",
                hora_inicio: _dataReturned.data.data_inicio ? getTimeSplited(_dataReturned.data.data_inicio) : "",
                data_fim: _dataReturned.data.data_fim ? convertDateUStoPT(_dataReturned.data.data_fim) : "",
                hora_fim: _dataReturned.data.data_fim ? getTimeSplited(_dataReturned.data.data_fim) : "",
                prazo_inscricao: _dataReturned.data.prazo_inscricao ? convertDateUStoPT(_dataReturned.data.prazo_inscricao) : "",
                hora_fim_prazo_inscricao: _dataReturned.data.prazo_inscricao ? getTimeSplited(_dataReturned.data.prazo_inscricao) : "",
                rua: _dataReturned.data.rua,
                numero: _dataReturned.data.numero,
                complemento: _dataReturned.data.complemento,
                bairro: _dataReturned.data.bairro,
                cidade: _dataReturned.data.cidade
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
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">CADASTRO DE SERVIÇOS</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={12}>
                                        <ValidationForm onSubmit={this.handleSubmit}>
                                            <Form.Group controlId="formServiceName">
                                                <Form.Label>Nome *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    defaultValue={this.state.name}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="(?=.*[A-Za-z]).{6,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 6 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formServiceDetalhes">
                                                <Form.Label>Detalhes *</Form.Label>
                                                <TextInput
                                                    name="detalhes"
                                                    placeholder="Detalhes"
                                                    defaultValue={this.state.detalhes}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="(?=.*[A-Za-z]).{6,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 6 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formServicePalestrante">
                                                <Form.Label>Palestrante *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="palestrante"
                                                    placeholder="Palestrante"
                                                    defaultValue={this.state.palestrante}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="(?=.*[A-Za-z]).{6,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 6 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServiceQtdVagas">
                                                    <Form.Label>Quantidade de Vagas *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="qtd_vagas"
                                                        placeholder="Qtd de vagas"
                                                        defaultValue={this.state.qtd_vagas}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        required
                                                        pattern="[0-9]*"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "só pode ser numero" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServicePrice">
                                                    <Form.Label>valor *</Form.Label>
                                                    <TextInputGroup
                                                        name="preco"
                                                        placeholder="Preço"
                                                        defaultValue={this.state.preco}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        required
                                                        pattern="([\d,]*)"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Esse campo não pode conter letras" }}
                                                        prepend={<span className="input-group-text">R$</span>}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServicePrice">
                                                    <Form.Label>Telefone Contato </Form.Label>
                                                    <TextInputGroup
                                                        name="tel_contato"
                                                        placeholder="Telefone contato"
                                                        defaultValue={this.state.tel_contato}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        required
                                                        pattern="([\d,]*)"
                                                        pattern="(?=.*[A-Za-z0-9]).{7,15}"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Entre 7 e 15 caracteres" }}
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Group controlId="formServiceuUrlImagem">
                                                <Form.Label>Url da Imagem *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="url_imagem"
                                                    placeholder="Url da Imagem"
                                                    defaultValue={this.state.url_imagem}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formServiceCategorias">
                                                <Form.Label>Categoria *</Form.Label>
                                                <SelectGroup
                                                    name="categoria"
                                                    id="categoria"
                                                    value={this.state.categoria}
                                                    onChange={this.handleChange}>
                                                    <option value={0}>Sem Categoria</option>
                                                    {this.state.categorias.map((categoria) => {
                                                        return (
                                                            <option value={categoria.id}>{categoria.name}</option>
                                                        )
                                                    })}
                                                </SelectGroup>
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <div className="switch switch-primary d-inline m-r-10">
                                                        <Form.Control type="checkbox" id="checked-publicado" name="publicado" checked={this.state.publicado} onChange={this.toggleHandler} />
                                                        <Form.Label htmlFor="checked-publicado" className="cr" />
                                                    </div>
                                                    <Form.Label>Publicado</Form.Label>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <div className="switch switch-primary d-inline m-r-10">
                                                        <Form.Control type="checkbox" id="checked-gratuito" name="gratuito" checked={this.state.gratuito} onChange={this.toggleHandler} />
                                                        <Form.Label htmlFor="checked-gratuito" className="cr" />
                                                    </div>
                                                    <Form.Label>Gratuito</Form.Label>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <div className="switch switch-primary d-inline m-r-10">
                                                        <Form.Control type="checkbox" id="checked-privado" name="privado" checked={this.state.privado} onChange={this.toggleHandler} />
                                                        <Form.Label htmlFor="checked-privado" className="cr" />
                                                    </div>
                                                    <Form.Label>Privado</Form.Label>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <div className="switch switch-primary d-inline m-r-10">
                                                        <Form.Control type="checkbox" id="checked-cancelado" name="cancelado" checked={this.state.cancelado} onChange={this.toggleHandler} />
                                                        <Form.Label htmlFor="checked-cancelado" className="cr" />
                                                    </div>
                                                    <Form.Label>Cancelado</Form.Label>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServiceDataInicio">
                                                    <Form.Label>Data Inicio *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="data_inicio"
                                                        placeholder="dd/mm/aaaa"
                                                        defaultValue={this.state.data_inicio}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "dd/mm/yyyy" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServiceDataInicio">
                                                    <Form.Label>Hora Inicio *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="hora_inicio"
                                                        placeholder="hh:mm"
                                                        defaultValue={this.state.hora_inicio}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "hh:mm" }}
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServiceDataInicio">
                                                    <Form.Label>Data Fim *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="data_fim"
                                                        placeholder="dd/mm/aaaa"
                                                        defaultValue={this.state.data_fim}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "dd/mm/yyyy" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServiceDataInicio">
                                                    <Form.Label>Hora Fim *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="hora_fim"
                                                        placeholder="hh:mm"
                                                        defaultValue={this.state.hora_fim}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "hh:mm" }}
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServicePrazoInscricao">
                                                    <Form.Label>Prazo Inscrição *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="prazo_inscricao"
                                                        placeholder="dd/mm/aaaa"
                                                        defaultValue={this.state.prazo_inscricao}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "dd/mm/yyyy" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServiceDataInicio">
                                                    <Form.Label>Hora Fim Prazo Incricao *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="hora_fim_prazo_inscricao"
                                                        placeholder="hh:mm"
                                                        defaultValue={this.state.hora_fim_prazo_inscricao}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "hh:mm" }}
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Group controlId="formServiceName">
                                                <Form.Label>Rua</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="rua"
                                                    placeholder="Rua"
                                                    defaultValue={this.state.rua}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    pattern="(?=.*[A-Za-z]).{5,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 5 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServiceName">
                                                    <Form.Label>Numero</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="numero"
                                                        placeholder="numero"
                                                        defaultValue={this.state.numero}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="(?=.*[A-Za-z0-9]).{1,50}"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Entre 1 e 50 caracteres" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServiceName">
                                                    <Form.Label>Complemento *</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="complemento"
                                                        placeholder="complemento"
                                                        defaultValue={this.state.complemento}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="(?=.*[A-Za-z0-9]).{1,50}"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Entre 1 e 50 caracteres" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServiceName">
                                                    <Form.Label>Bairro</Form.Label>
                                                    <TextInput
                                                        type="text"
                                                        name="bairro"
                                                        placeholder="Bairro"
                                                        defaultValue={this.state.bairro}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="(?=.*[A-Za-z0-9]).{6,50}"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Entre 6 e 50 caracteres" }}
                                                    />
                                                </Form.Group>

                                            </Form.Row>
                                            <Form.Group controlId="formServiceName">
                                                <Form.Label>Cidade</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="cidade"
                                                    placeholder="cidade"
                                                    defaultValue={this.state.cidade}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    pattern="(?=.*[A-Za-z0-9]).{5,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 5 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formServiceDescricao">
                                                <Form.Label>Descrição</Form.Label>
                                                <SunEditor name="descricao" onChange={(value) => this.descricaoChange(value)} setContents={this.state.descricao} />
                                            </Form.Group>
                                            <Form.Group style={{ marginTop: '45px', textAlign: 'right' }}>
                                                <Button variant="secondary" onClick={this.props.handleCloseCreate}>CANCELAR</Button>
                                                <Button type="submit" variant="primary">SALVAR</Button>
                                            </Form.Group>
                                        </ValidationForm>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux >
        );
    }
}

export default Create;
