import React from 'react';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Form, Button } from 'react-bootstrap';

const TokenConfirmationForm = (props) => {
    return (
        <>
            <h3 className="mb-4">Token Confirmation</h3>
            <ValidationForm onSubmit={props.handleSubmitToken} method='POST'>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="text"
                        name="activation_token"
                        placeholder="Insira o token de confirmação"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        errorMessage={{ validator: "Insira o token recebido no email"}}
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary mb-4 shadow-2">Reset Password</Button>
            </ValidationForm>
        </>
    )
}

export default TokenConfirmationForm