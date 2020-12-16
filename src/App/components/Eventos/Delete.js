import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Aux from "../../../hoc/_Aux";
import { AiOutlineWarning } from "react-icons/ai"
import Service from "../../../services/EventoService"
import InscricaoService from "../../../services/InscricaoService"

class Delete extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            existeInscrito: false
        }
    };

    UNSAFE_componentWillMount() {
        this.verificarSeExisteInscritos(this.state.id)
    };

    verificarSeExisteInscritos = (eventoId) => {
        InscricaoService.getByEventoId(eventoId).then((_dataCollection) => {
            if(_dataCollection.data.length > 0){
                this.setState({ existeInscrito: true })
            }
        })
    }

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

                {this.state.existeInscrito
                    ? <>
                        <Modal.Header closeButton>
                            <Modal.Title>Não pode ser deletado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AiOutlineWarning size={60} style={{ color: "red" }} />
                            <div>
                                <p>Neste Evento existem inscritos e por isso não pode ser deletado</p>
                            </div>
                        </Modal.Body>
                    </>
                    :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Você tem certeza?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AiOutlineWarning size={60} style={{ color: "red" }} />
                            <div>
                                <p>Você realmente quer deletar? Esse processo não pode ser desfeito.</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.handleCloseDelete}>NÃO</Button>
                            <Button variant="danger" onClick={this.deleteElement}>SIM</Button>
                        </Modal.Footer>
                    </>
                }
            </Aux>
        );
    }
}

export default Delete;
