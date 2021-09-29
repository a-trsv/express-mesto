const jwt = require('jsonwebtoken')
const UnauthorizedError = require('./errors/error-unathorized')

const JWT_SECRET = 'secret'

function auth(req, res, next) {
    const token = req.cookies.jwt
    let payload

    try {
        payload = jwt.verify(token, JWT_SECRET)
    } catch (error) {
        throw new UnauthorizedError('Отказ в авторизации!')
    }
    req.user = payload
    next()
}


module.exports = auth