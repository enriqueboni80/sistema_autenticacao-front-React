
import React from "react";

const ActivationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmitToken} method='POST'>
            < div className="mb-4" >
                <i className="feather icon-user-plus auth-icon" />
            </div >
            <h3 className="mb-4">Ativar Token</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" name='activation_token' placeholder="Token recebido no email" />
            </div>
            <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                    <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" />
                </div>
            </div>
            <button className="btn btn-primary shadow-2 mb-4">Sign up</button>
        </form>)
}

export default ActivationForm