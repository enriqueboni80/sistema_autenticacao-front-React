import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, TextInputGroup, SelectGroup } from 'react-bootstrap4-form-validation';
import Service from "../../../services/EventosService"
import Aux from "../../../hoc/_Aux";
import { convertCurrencyPTtoUS, convertCurrencyUStoPT } from "../../../helpers/convertCurrency"

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            duration: "",
            price: "",
            percentage_commission: "",
            fixed_commission: "",
            type_commission: 0,
            nameErrors: "",
            descriptionErrors: "",
            durationErrors: "",
            priceErrors: "",
            percentageCommissionErrors: "",
            fixedCommissionErrors: "",
            typeCommissionErrors: "",
        }
    };

    fieldErrors = [
        /* 
        O campo field tem que ser igual o que é retornado pelo BackEnd (é utilizando para comparar os erros retornados)
        O campo fieldError será utilizando para setar a state, por isso seu nome deve ser igual ao da state de error
        */
        { field: 'Name', fieldError: 'nameErrors' },
        { field: 'Description', fieldError: 'descriptionErrors' },
        { field: 'Duration', fieldError: 'durationErrors' },
        { field: 'Price', fieldError: 'priceErrors' },
        { field: 'Percentage_commission', fieldError: 'percentageCommissionErrors' },
        { field: 'Fixed_commission', fieldError: 'fixedCommissionErrors' }
    ]

    UNSAFE_componentWillMount() {
        this.getById()
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault()
        var formData = {
            name: this.state.name,
            description: this.state.description,
            duration: this.state.duration,
            price: convertCurrencyPTtoUS(this.state.price),
            percentage_commission: this.state.percentage_commission,
            fixed_commission: convertCurrencyPTtoUS(this.state.fixed_commission),
            type_commission: this.state.type_commission
        }

        if (this.state.id === '') {
            Service.create(formData).then((response) => {
                if (response.data.success) {
                    if (this.props.handleCloseCreate) {
                        this.props.handleCloseCreate()
                        this.props.getAll()
                    } else {
                        window.location.href = "/service/index";
                    }
                } else {
                    let errors = response.data.data
                    this.setErrors(errors)
                    this.showResponseErrors()
                }
            })
        }
        else {
            formData.id = this.state.id
            Service.update(formData).then((response) => {
                if (response.data.success) {
                    if (this.props.handleCloseCreate) {
                        this.props.handleCloseCreate()
                        this.props.getAll()
                    } else {
                        window.location.href = "/service/index";
                    }
                } else {
                    let errors = response.data.data
                    this.setErrors(errors)
                    this.showResponseErrors()
                }
            })
        }
    }

    getById = () => {
        let id = this.props.id
        Service.getById(id).then((_dataReturned) => {
            this.setState({
                id: _dataReturned.data.data.id,
                name: _dataReturned.data.data.name,
                description: _dataReturned.data.data.description,
                duration: _dataReturned.data.data.duration,
                price: convertCurrencyUStoPT(_dataReturned.data.data.price),
                percentage_commission: _dataReturned.data.data.percentage_commission,
                fixed_commission: convertCurrencyUStoPT(_dataReturned.data.data.fixed_commission),
                type_commission: _dataReturned.data.data.type_commission
            })
        })
    }

    setErrors = (errors) => {
        this.setState({
            nameErrors: "",
            descriptionErrors: "",
            durationErrors: "",
            priceErrors: "",
            percentageCommissionErrors: "",
            fixedCommissionErrors: "",
        })
        errors.map((error) => {
            this.fieldErrors.forEach(element => {
                if (element.field === error.property) {
                    this.setState({ [element.fieldError]: [...this.state[element.fieldError], error.message] })
                }
            });
            return ''
        })
    }

    showResponseErrors = () => {
        this.fieldErrors.forEach(element => {
            if (this.state[element.fieldError]) {
                this.state[element.fieldError].forEach(error => {
                    alert(`Return BackEnd: ${error}`)
                });
            }
        });
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
                                                <Form.Label>Serviço *</Form.Label>
                                                <TextInput
                                                    type="text"
                                                    name="name"
                                                    placeholder="Serviço"
                                                    defaultValue={this.state.name}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="(?=.*[A-Za-z]).{5,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 3 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formServiceDescription">
                                                <Form.Label>Descrição *</Form.Label>
                                                <TextInput
                                                    name="description"
                                                    placeholder="Descrição"
                                                    defaultValue={this.state.description}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="(?=.*[A-Za-z]).{5,50}"
                                                    errorMessage={{ required: "Campo Requerido", pattern: "Entre 5 e 50 caracteres" }}
                                                />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServicePrice">
                                                    <Form.Label>Preço *</Form.Label>
                                                    <TextInputGroup
                                                        name="price"
                                                        placeholder="Preço"
                                                        defaultValue={this.state.price}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        required
                                                        pattern="([\d,]*)"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Esse campo não pode conter letras" }}
                                                        prepend={<span className="input-group-text">R$</span>}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServiceDuration">
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
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formServiceFixedCommission">
                                                    <Form.Label>Comissão Fixa</Form.Label>
                                                    <TextInputGroup
                                                        prepend={<span className="input-group-text">R$</span>}
                                                        name="fixed_commission"
                                                        placeholder="Comissão fixa"
                                                        defaultValue={this.state.fixed_commission}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="([\d,]*)"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Esse campo não pode conter letras" }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formServicePercentageComission">
                                                    <Form.Label>Porcentagem de comissão</Form.Label>
                                                    <TextInputGroup
                                                        name="percentage_commission"
                                                        placeholder="Porcentagem de comissão"
                                                        defaultValue={this.state.percentage_commission}
                                                        autoComplete="off"
                                                        onChange={this.handleChange}
                                                        pattern="([\d]*)"
                                                        errorMessage={{ required: "Campo Requerido", pattern: "Esse campo não pode conter letras" }}
                                                        append={<span className="input-group-text">%</span>}
                                                    />
                                                </Form.Group>

                                            </Form.Row>
                                            <Form.Group controlId="formServiceTypeCommission">
                                                <Form.Label>Qual comissão será utilizada *</Form.Label>
                                                <SelectGroup
                                                    name="type_commission"
                                                    id="type_commission"
                                                    value={this.state.type_commission}
                                                    onChange={this.handleChange}>
                                                    <option value="0">Não aplicada</option>
                                                    <option value="1">Porcentagem</option>
                                                    <option value="2">Fixa</option>
                                                </SelectGroup>
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
            </Aux>
        );
    }
}

export default Create;
