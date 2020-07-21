import React from 'react';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Form, Button } from 'react-bootstrap';
import validator from 'validator' 

const SendMailForm = (props) => {
    return (
        <>
            <h3 className="mb-4">Reset Password</h3>
            <ValidationForm onSubmit={props.handleSubmitEmail} method='POST'>
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="text"
                        name="email"
                        placeholder="email"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                        validator={validator.isEmail}
                        errorMessage={{ validator: "insira um email válido"}}
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary mb-4 shadow-2">Reset Password</Button>
            </ValidationForm>
        </>
    )
}

export default SendMailForm