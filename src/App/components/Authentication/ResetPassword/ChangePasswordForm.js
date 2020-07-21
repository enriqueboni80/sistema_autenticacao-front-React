import React from 'react';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Form, Button } from 'react-bootstrap';

const ChangePasswordForm = (props) => {
    return (
        <>
            <h3 className="mb-4">Change Password</h3>
            <ValidationForm onSubmit={props.handleSubmitChangePassword} method='POST'>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Zçã.\d]{7,}$"
                        errorMessage={{ required: "Campo Requerido", pattern: "Mínimo de 7 caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número" }}
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
                <Button type="submit" className="btn btn-primary mb-4 shadow-2">Reset Password</Button>
            </ValidationForm>
        </>
    )
}

export default ChangePasswordForm