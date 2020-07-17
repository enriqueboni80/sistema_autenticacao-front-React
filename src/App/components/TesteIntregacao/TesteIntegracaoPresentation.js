import React from "react"

const TesteIngregacaoPresentation = (props) => {
    return (
        <div className="container-fluid">
            <h1 className="mt-4">Teste de Integraçao</h1>
            {props.dadosRetornados.length > 1
                ?
                <ol className="breadcrumb mb-4 bg-success">
                    <li className="breadcrumb-item active">"CONTECTADO AO BACKEND"</li>
                </ol>
                :
                <ol className="breadcrumb mb-4 bg-danger">
                    <li className="breadcrumb-item active">"NÃO CONECTADO: SERVIDOR BACKEND NÃO LIGADO OU NÃO CONECTADO"</li>
                </ol>
            }
            <div>DADOS RETORNADOS</div>
            {props.dadosRetornados.map((teste, i) => {
                return (
                    <div key={i}>
                        <div>{teste.date}</div>
                        <div>{teste.temperatureC}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default TesteIngregacaoPresentation