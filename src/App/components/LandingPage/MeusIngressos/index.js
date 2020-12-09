import React from 'react';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import Service from "../../../../services/InscricaoService"
import Aux from "../../../../hoc/_Aux";
import { convertDateUStoPT } from "../../../../helpers/convertDate"


class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            dataCollection: []
        }
    };


    UNSAFE_componentWillMount() {
        this.getInscricoesByUserId(this.state.userId)
    };

    getInscricoesByUserId = (userId) => {
        Service.getInscricoesByUserId(userId).then((_dataCollection) => {
            this.setState({ dataCollection: _dataCollection.data })
        })
    }


    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                {this.state.dataCollection.map(evento => {
                                    return(
                                        <div>
                                            {evento.evento_id}
                                        </div>
                                    )
                                })}
                            </Card.Header>
                        </Card>
                    </Col>
                </Row>

            </Aux>


        );
    }
}

export default Index;




