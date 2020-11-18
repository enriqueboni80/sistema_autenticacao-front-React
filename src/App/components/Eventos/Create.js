import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, TextInputGroup, SelectGroup } from 'react-bootstrap4-form-validation';
import Service from "../../../services/EventoService"
import CategoriaService from "../../../services/EventoCategoriaService"
import Aux from "../../../hoc/_Aux";
import { convertCurrencyPTtoUS, convertCurrencyUStoPT } from "../../../helpers/convertCurrency"

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
            data_fim: "",
            prazo_inscricao: "",
            categorias: []
        }
    };


    UNSAFE_componentWillMount() {
        this.getById()
        this.getCategorias()
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

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
            publicado: this.state.publicado ? true : false,
            gratuito: this.state.gratuito ? true : false,
            preco: this.state.preco,
            privado: this.state.privado ? true : false,
            cancelado: this.state.cancelado ? true : false,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
            prazo_inscricao: this.state.prazo_inscricao
        }


        if (this.state.id === undefined) {
            Service.create(formData).then(() => {
                this.props.handleCloseCreate()
                this.props.getAll()
            }).catch((errors) => {
                console.log(errors.response.data.error)
            })
        }
        else {
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
                preco: _dataReturned.data.preco,
                privado: _dataReturned.data.privado,
                cancelado: _dataReturned.data.cancelado,
                data_inicio: _dataReturned.data.data_inicio,
                data_fim: _dataReturned.data.data_fim,
                prazo_inscricao: _dataReturned.data.prazo_inscricao
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
                                            <Form.Group controlId="formServiceDescricao">
                                                <Form.Label>Descrição *</Form.Label>
                                                <TextInput
                                                    name="descricao"
                                                    placeholder="Descrição"
                                                    defaultValue={this.state.descricao}
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
                                            <Form.Group controlId="formServiceQtdVagas">
                                                <Form.Label>Quantidade de Vagas *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="qtd_vagas"
                                                    placeholder="Quantidade de vagas"
                                                    defaultValue={this.state.qtd_vagas}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="[0-9]*"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "só pode ser numero" }}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formServiceuUrlImagem">
                                                <Form.Label>Url da Imagem *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="url_imagem"
                                                    placeholder="Url da Imagem"
                                                    defaultValue={this.state.url_imagem}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formServiceCategorias">
                                                <Form.Label>Categoria *</Form.Label>
                                                <SelectGroup
                                                    name="categoria"
                                                    id="categoria"
                                                    value={this.state.categoria}
                                                    onChange={this.handleChange}>
                                                    {this.state.categorias.map((categoria) => {
                                                        return (
                                                            <option value={categoria.id}>{categoria.name}</option>
                                                        )
                                                    })}
                                                </SelectGroup>
                                            </Form.Group>

                                            <Form.Group>
                                                <div className="switch switch-primary d-inline m-r-10">
                                                    <Form.Control type="checkbox" id="checked-publicado" name="publicado" checked={this.state.publicado} onChange={this.toggleHandler} />
                                                    <Form.Label htmlFor="checked-publicado" className="cr" />
                                                </div>
                                                <Form.Label>Publicado</Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                                <div className="switch switch-primary d-inline m-r-10">
                                                    <Form.Control type="checkbox" id="checked-gratuito" name="gratuito" checked={this.state.gratuito} onChange={this.toggleHandler} />
                                                    <Form.Label htmlFor="checked-gratuito" className="cr" />
                                                </div>
                                                <Form.Label>Gratuito</Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                                <div className="switch switch-primary d-inline m-r-10">
                                                    <Form.Control type="checkbox" id="checked-privado" name="privado" checked={this.state.privado} onChange={this.toggleHandler} />
                                                    <Form.Label htmlFor="checked-privado" className="cr" />
                                                </div>
                                                <Form.Label>Privado</Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                                <div className="switch switch-primary d-inline m-r-10">
                                                    <Form.Control type="checkbox" id="checked-cancelado" name="cancelado" checked={this.state.cancelado} onChange={this.toggleHandler} />
                                                    <Form.Label htmlFor="checked-cancelado" className="cr" />
                                                </div>
                                                <Form.Label>Cancelado</Form.Label>
                                            </Form.Group>


                                            <Form.Group controlId="formServiceDataInicio">
                                                <Form.Label>Data Inicio *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="data_inicio"
                                                    placeholder="data_inicio"
                                                    defaultValue={this.state.data_inicio}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                /* required */
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formServiceDataInicio">
                                                <Form.Label>Data Fim *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="data_fim"
                                                    placeholder="data_fim"
                                                    defaultValue={this.state.data_fim}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                /* required */
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formServicePrazoInscricao">
                                                <Form.Label>Prazo Inscrição *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="prazo_inscricao"
                                                    placeholder="prazo inscrição"
                                                    defaultValue={this.state.prazo_inscricao}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                /* required */
                                                />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServicePrice">
                                                    <Form.Label>Preço *</Form.Label>
                                                    <TextInputGroup
                                                        name="preco"
                                                        placeholder="Preço"
                                                        defaultValue={this.state.preco}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                    /* required */
                                                    /*                                                         pattern="([\d,]*)"
                                                                                                            errorMessage={{ required: "Campo Requerido", pattern: "Esse campo não pode conter letras" }}
                                                                                                            prepend={<span className="input-group-text">R$</span>} */
                                                    />
                                                </Form.Group>
                                                {/*                                                 <Form.Group as={Col} controlId="formServiceDuration">
                                                    <Form.Label>Duração</Form.Label>
                                                    <TextInputGroup
                                                        name="duration"
                                                        placeholder="Duration"
                                                        defaultValue={this.state.duration}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="([\d]*)"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Esse campo deve ser numérico" }}
                                                        append={<span className="input-group-text">min</span>}
                                                    />
                                                </Form.Group> */}
                                            </Form.Row>
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
            </Aux>
        );
    }
}

export default Create;
