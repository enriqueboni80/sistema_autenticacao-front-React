
module.exports = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getJwt()
    }
}

function getJwt() {
    if (localStorage.getItem('user_session')) {
        return `Bearer ${JSON.parse(localStorage.getItem('user_session')).jwtToken}`
    } else {
        return ''
    }
}




