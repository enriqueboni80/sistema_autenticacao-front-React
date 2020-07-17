/* import React, { useState, useEffect } from "react"; */
import React from 'react';

const RegisterForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} method='POST'>
            < div className="mb-4" >
                <i className="feather icon-user-plus auth-icon" />
            </div >
            <h3 className="mb-4">Sign up</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" name='username' placeholder="Username" />
            </div>
            <div className="input-group mb-3">
                <input type="email" className="form-control" name='email' placeholder="Email" />
            </div>
            <div className="input-group mb-4">
                <input type="password" className="form-control" name='password' placeholder="password" />
            </div>
            <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                    <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" />
                    {/* <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label> */}
                </div>
            </div>
            <button className="btn btn-primary shadow-2 mb-4">Sign up</button>
        </form>
    )
}

export default RegisterForm



