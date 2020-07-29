import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "./../../../hoc/_Aux";
import Card from "./../../../App/components/MainCard";

import LandingPageService from "./../../../services/LandingPageService"

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventos: []
        }
    };

    UNSAFE_componentWillMount() {
        this.requestTest()
    }

    requestTest = async () => {
        const result = await LandingPageService.getValues()
        this.setState({ eventos: result.data })
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        {this.state.eventos.map((evento, key) => {
                            return (
                                <ul key={key}>
                                    <li>{evento.nome}</li>
                                </ul>
                            )
                        })}
                        <a href="./auth/signin/">LogIn</a>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Index;