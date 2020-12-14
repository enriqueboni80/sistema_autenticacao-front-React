const convertDatePTtoUS = (date, time) => {
    var _date = date.split('/');
    var dia = _date[0]
    var mes = _date[1]
    var ano = _date[2]
    return `${ano}-${mes}-${dia} ${time}`
}

const convertDateUStoPT = (dateWithTime) => {
    var dateWithoutTime = dateWithTime.split('T')[0]
    var _date = dateWithoutTime.split('-');
    var ano = _date[0]
    var mes = _date[1]
    var dia = _date[2]
    return `${dia}/${mes}/${ano}`
}

export { convertDatePTtoUS, convertDateUStoPT };