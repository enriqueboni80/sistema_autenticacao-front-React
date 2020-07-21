import React from 'react';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Form, Button } from 'react-bootstrap';

const RegisterForm = (props) => {
    return (
        <>
            < div className="mb-4" >
                <i className="feather icon-user-plus auth-icon" />
            </div >
            <ValidationForm onSubmit={props.handleSubmit}>
                <h3 className="mb-4">Sign up</h3>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="text"
                        name="username"
                        placeholder="UserName"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        pattern="(?=.*[A-Za-z]).{6,50}"
                        errorMessage={{ required: "Campo Requerido", pattern: "Entre 6 e 50 caracteres" }}
                    />
                </Form.Group>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="text"
                        name="email"
                        placeholder="email"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        pattern="^([\w\+\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"
                        validator={props.checkEmailFree}
                        errorMessage={{ validator: "Esse email não esta liberado", pattern: "precisa ser um email válido" }}
                    />
                </Form.Group>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Zçã.\d]{7,}$"
                        errorMessage={{ required: "Campo Requerido", pattern: "Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número" }}
                    />
                </Form.Group>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="password"
                        name="confirmationPassword"
                        placeholder="Confirmation Password"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        validator={props.matchPassword}
                        errorMessage={{ required: "Campo Requerido", validator: "O password e a confirmação DEVEM SER IGUAIS" }}
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary shadow-2 mb-4">Sign up</Button>
            </ValidationForm>
        </>
    )
}

export default RegisterForm



