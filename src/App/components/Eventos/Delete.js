import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Aux from "../../../hoc/_Aux";
import { AiOutlineWarning } from "react-icons/ai"
import Service from "../../../services/EventoService"

class Delete extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
    };

    deleteElement = (e) => {
        e.preventDefault()
        let id = this.state.id
        Service.delete(id).then(() => {
            this.props.handleCloseDelete()
            this.props.getAll()
        })
    }

    render() {
        return (
            <Aux>
                <Modal.Header closeButton>
                    <Modal.Title>Você tem certeza?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AiOutlineWarning size={60} style={{ color: "red" }} />
                    <div>
                        <p>Do you really want to delete these records? This process cannot be undone.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleCloseDelete}>NÃO</Button>
                    <Button variant="danger" onClick={this.deleteElement}>SIM</Button>
                </Modal.Footer>
            </Aux>
        );
    }
}

export default Delete;
