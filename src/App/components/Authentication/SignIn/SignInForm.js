import React from 'react';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Form, Button } from 'react-bootstrap';

import validator from 'validator' 

import './../../../../assets/scss/style.scss';

const RegisterForm = (props) => {

    return (
        <>
            <ValidationForm onSubmit={props.handleSubmit} method="POST">
                < div className="mb-4" >
                    <i className="feather icon-user-plus auth-icon" />
                </div >
                <h3 className="mb-4">Sign In</h3>
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
                <Form.Group controlId="formServiceName">
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="off"
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary shadow-2 mb-4">Sign In</Button>
            </ValidationForm>
        </>
    )
}


export default RegisterForm;