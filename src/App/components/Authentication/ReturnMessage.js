import React from "react";
import { FiAlertTriangle, FiAlertCircle, FiCheck } from "react-icons/fi"

const ReturnMessage = (props) => {
    return (
        <>
            <div>
                {
                    props.returnMessage.type === 'error' ? <FiAlertCircle size={50} color={'red'} />
                        : props.returnMessage.type === 'warning' ? <FiAlertTriangle size={50} color={'orange'} />
                            : props.returnMessage.type === 'success' ? <FiCheck size={50} color={'green'} />
                                : "entre em contato com o Admin"
                }
            </div>
            <div >
                <h3 style={{marginTop: "15px"}} className="mb-4">{props.returnMessage.message}</h3>
            </div>

        </>
    )
}

export default ReturnMessage