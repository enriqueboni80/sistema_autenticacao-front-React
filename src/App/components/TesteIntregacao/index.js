import React, { useState, useEffect } from "react";
import TesteIntegracaoService from "../../../services/TesteIntegracaoService"
import TesteIntegracaoPresentation from "./TesteIntegracaoPresentation"

const Index = () => {

    const [dadosRetornados, setDadosRetornados] = useState([{}])

    const requestTest = async () => {
        const result = await TesteIntegracaoService.getValues()
        console.log(result.data)
        setDadosRetornados(result.data)
    }

    useEffect(() => {
        requestTest();
    }, [])

    return (
        <TesteIntegracaoPresentation dadosRetornados={dadosRetornados} />
    )
}

export default Index