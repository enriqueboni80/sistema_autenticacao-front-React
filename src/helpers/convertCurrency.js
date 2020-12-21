const convertCurrencyPTtoUS = (valor) => {
    if (valor !== undefined) {
        return valor.replace(',', '.');
    }
    return ""
}

const convertCurrencyUStoPT = (valor) => {
    if (valor !== undefined) {
        let valorConvertido = valor.toFixed(2).toString();
        return valorConvertido.replace('.', ',');
    }
    return ""
}

export { convertCurrencyPTtoUS, convertCurrencyUStoPT };