import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "./../../../../hoc/_Aux";
import Card from "./../../../../App/components/MainCard";

class Index extends Component {


    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Hello Card' isOption>
                            Meus Eventos
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Index;