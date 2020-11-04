import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Aux from "./../../../../hoc/_Aux";
/* import Card from "./../../../../App/components/MainCard"; */

import EventoService from "./../../../../services/EventosService"

class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            eventos: []
        }
    };

    UNSAFE_componentWillMount() {
        this.getTodosEventos()
    }

    getTodosEventos = async () => {
        EventoService.getValues().then((res) => {
            this.setState({ 'eventos': res.data })
        })
    }

    render() {
        return (
            <Aux>
                <Row>
                    {this.state.eventos.map((evento) => {
                        return (
                            <Col md={6} xl={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='https://media-exp1.licdn.com/dms/image/C4D1BAQFAC3o2eHS_vA/company-background_10000/0?e=2159024400&v=beta&t=EUdtqUGN2pXf17w9xlDLBdSI60wIgV4gI0W36q8NHto' />
                                        <h5 className="m-t-35">{evento.name}</h5>
                                        <span className="text-muted d-block m-b-30">By Creative Studio Form</span>
                                        <p className="border-top m-b-20 p-t-10 m-t-20"></p>
                                        <div className="row" style={{textAlign: "center"}}>
                                                <div className="col">
                                                    <h5>$ 5236.42</h5>
                                                    <span>BUDGET</span>
                                                </div>
                                                <div className="col">
                                                    <h5>9 May 2017</h5>
                                                    <span>DEADLINE</span>
                                                </div>

                                            </div>
                                        <div className="row m-t-30" style={{margin: "30px auto 1px"}}>
                                            <div className="col-6 p-r-0">
                                                <a href='#' className="btn btn-primary  text-uppercase btn-block">add friend</a>
                                            </div>
                                            <div className="col-6">
                                                <a href='#' className="btn text-uppercase border btn-block btn-outline-secondary">message</a>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Aux>
        );
    }
}

export default Index;


