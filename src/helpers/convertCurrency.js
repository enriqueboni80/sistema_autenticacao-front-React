const convertCurrencyPTtoUS = (valor) => {
    return valor.replace(',', '.');
}

const convertCurrencyUStoPT = (valor) => {
    let valorConvertido = valor.toFixed(2).toString();
    return valorConvertido.replace('.', ',');
}

export { convertCurrencyPTtoUS, convertCurrencyUStoPT };