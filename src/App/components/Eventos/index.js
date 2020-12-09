import React from 'react';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import Service from "../../../services/EventoService"
import Aux from "../../../hoc/_Aux";
import { FaRegTrashAlt, FaRegEdit, FaListOl } from "react-icons/fa"
import { convertCurrencyUStoPT } from "../../../helpers/convertCurrency"
import { convertDateUStoPT } from "../../../helpers/convertDate"
import Create from "./Create"
import Delete from "./Delete"


class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataCollection: '',
            id: '',
            showModalDelete: false,
            showModalCreate: false,
            showModalUpdate: false
        }
    };

    UNSAFE_componentWillMount() {
        this.getAll()
    };

    handleShowCreate = (e, id) => {
        e.preventDefault()
        this.setState({ id: id })
        this.setState({ showModalCreate: true });
    }

    handleCloseCreate = () => {
        this.setState({ showModalCreate: false });
    }

    handleShowDelete = (e, id) => {
        e.preventDefault()
        this.setState({ id: id })
        this.setState({ showModalDelete: true });
    }

    handleCloseDelete = () => {
        this.setState({ showModalDelete: false });
    }

    getAll = () => {
        Service.getAll().then((_dataCollection) => {
            _dataCollection.data.sort(function (a, b) { return b - a });
            this.setState({ dataCollection: _dataCollection.data.reverse() })
        })
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header style={{ textAlign: 'right' }}>
                                <Button onClick={(e) => this.handleShowCreate(e)}>Novo</Button>
                            </Card.Header>
                            <Card.Body>
                                {this.state.dataCollection.length === 0 ? <div>Não existem registros na tabela</div>
                                    : <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Vagas</th>
                                                <th>Categoria</th>
                                                <th>Preço</th>
                                                <th>Publicado</th>
                                                <th>Data Início</th>
                                                <th>Data Fim</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataCollection.map((data, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <th scope="row">{data.id}</th>
                                                        <td>{data.name}</td>
                                                        <td>{data.qtd_vagas}</td>
                                                        <td>{data.categoria}</td>
                                                        <td>R$ {convertCurrencyUStoPT(data.preco)}</td>
                                                        <td>{data.publicado ? "Sim" : "Não"}</td>
                                                        <td>{convertDateUStoPT(data.data_inicio)}</td>
                                                        <td>{convertDateUStoPT(data.data_fim)}</td>
                                                        <td style={{display: "flex", justifyContent: "center"}}>
                                                            <div><FaListOl size={19} style={{ cursor: 'pointer', marginRight:'5px' }}/></div>
                                                            <div><FaRegEdit size={19}
                                                                onClick={(e) => this.handleShowCreate(e, data.id)}
                                                                style={{ cursor: 'pointer' }}
                                                                title='edit'
                                                            /></div>
                                                            <div>
                                                                <FaRegTrashAlt size={19} variant="primary"
                                                                    onClick={(e) => this.handleShowDelete(e, data.id)}
                                                                    style={{ cursor: 'pointer' }}
                                                                    title='delete'
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Modal show={this.state.showModalDelete} onHide={this.handleCloseDelete} style={{ textAlign: 'center' }}>
                    <Delete id={this.state.id} handleCloseDelete={this.handleCloseDelete} getAll={this.getAll} />
                </Modal>
                <Modal size="lg" show={this.state.showModalCreate} onHide={this.handleCloseCreate}>
                    <Create id={this.state.id} handleCloseCreate={this.handleCloseCreate} getAll={this.getAll} />
                </Modal>
            </Aux>
        );
    }
}

export default Index;
