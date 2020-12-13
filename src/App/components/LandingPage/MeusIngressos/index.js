import React from 'react';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import Service from "../../../../services/InscricaoService"
import Aux from "../../../../hoc/_Aux";
import { convertCurrencyUStoPT } from "../../../../helpers/convertCurrency"
import { convertDateUStoPT } from "../../../../helpers/convertDate"
import InscricaoService from "./../../../../services/InscricaoService"



class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            loggedUser: '',
            eventos: []
        }
    };


    UNSAFE_componentWillMount() {
        this.checkIsAuth()
        this.getInscricoesByUserId(this.state.userId)
    };

    checkIsAuth = async () => {
        if (localStorage.getItem('user_session')) {
            this.setState({ isAuthenticated: true })
            this.setState({ loggedUser: JSON.parse(localStorage.getItem('user_session')) })
        }
    }

    getInscricoesByUserId = (userId) => {
        Service.getInscricoesByUserId(userId).then((_dataCollection) => {
            this.setState({ eventos: _dataCollection.data })
        })
    }

    desinscricaoEvento = async (e, eventoId) => {
        e.preventDefault()
        InscricaoService.desinscrever(eventoId, this.state.loggedUser.id).then((res) => {
            this.setState({inscrito: false})
            this.getInscricoesByUserId(this.state.loggedUser.id)
        })
    }


    render() {
        return (
            <Aux>
                <Row>
                    {this.state.eventos.map((evento) => {
                        if (evento.publicado) {
                            return (
                                <Col md={6} xl={4} key={evento.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Img src={evento.url_imagem ? evento.url_imagem : `${process.env.REACT_APP_FRONTEND_SERVER_URL}/images/evento-padrao-img.png`} />
                                            <h5 className="m-t-35">{evento.name}</h5>
                                            <span className="text-muted d-block m-b-30">{evento.descricao}</span>
                                            <p className="border-top m-b-20 p-t-10 m-t-20"></p>
                                            <div className="row" style={{ textAlign: "center" }}>
                                                <div className="col">
                                                    <h5>R$ {evento.preco ? convertCurrencyUStoPT(evento.preco) : ''} </h5>
                                                    <span>Investimento</span>
                                                </div>
                                                <div className="col">
                                                    <h5>{convertDateUStoPT(evento.prazo_inscricao)}</h5>
                                                    <span>Prazo Inscrição</span>
                                                </div>

                                            </div>
                                            <div className="row m-t-30" style={{ margin: "30px auto 1px" }}>                                                
                                                <div className="col-6 p-r-0">
                                                {this.state.isAuthenticated ? <a href='#' className="btn btn-primary text-uppercase btn-block" onClick={(e) => this.desinscricaoEvento(e, evento.evento_id)}>desinscrever</a>: ""}
                                                </div>
                                                <div className="col-6">
                                                    <a href='#' className="btn text-uppercase border btn-block btn-outline-secondary">Ver Detalhes</a>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>
            </Aux>
        );
    }
}

export default Index;




