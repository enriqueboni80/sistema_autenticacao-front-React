const convertDatePTtoUS = (date) => {
    var _date = date.split('/');
    var dia = _date[0]
    var mes = _date[1]
    var ano = _date[2]
    return `${ano}-${mes}-${dia}`
}

const convertDateUStoPT = (dateWithTime) => {
    var dateWithoutTime = dateWithTime.split('T')[0]
    var _date = dateWithoutTime.split('-');
    var ano = _date[0]
    var mes = _date[1]
    var dia = _date[2]
    return `${dia}/${mes}/${ano}`
}

const getTimeSplited = (dateWithTime) => {
    var time = dateWithTime.split("T")[1]
    var arrTime = time.split(':')
    var hora = arrTime[0]
    var minuto = arrTime[1]
    return `${hora}:${minuto}`
}


export { convertDatePTtoUS, convertDateUStoPT, getTimeSplited };