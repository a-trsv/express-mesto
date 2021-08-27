const User = require('../models/user')

// Errors

//400 -> переданы некорректные данные
const ERROR_REQUEST = 400
//404 -> карточка/пользователь не найдены
const ERROR_CODE = 404
//500 -> ошибка по-умолчанию
const SERVER_ERROR = 500

const getUsers = (req, res) => {
    User.find({})
        .then(users => {
            if (users.length === 0) {
                return res.status(ERROR_CODE).send({ message: 'Зарегистрированных пользователей нет!' })
            }
            res.status(200).send(users)
        })
        .catch((error) => res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` }))
}

const getUserById = (req, res) => {
    const { userId } = req.params
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' })
            }
            res.status(200).send(user)
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                return res.status(ERROR_REQUEST).send({ message: 'Введенные данные некорректны!' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

const createUser = (req, res) => {
    const { name, about, avatar } = req.body
    User.create({ name, about, avatar })
        .then(user => {
            res.status(200).send(user)
        })
        .catch((error) => {
            if (error.name === 'ValidationError') {
                return res.status(ERROR_REQUEST).send({ message: 'Введенные данные некорректны!' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

const updateUser = (req, res) => {
    const { name, about } = req.body
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
        .then((user) => {
            if (!user) {
                return res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' })
            }
            res.status(200).send(user)
        })
        .catch((error) => {
            if (error.name === 'ValidationError' || error.name === 'CastError') {
                return res.status(ERROR_REQUEST).send({ message: 'Введенные данные некорректны!' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

const updateUserAvatar = (req, res) => {
    const { avatar } = req.body
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
        .then((user) => {
            if (!user) {
                return res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' })
            }
            res.status(200).send(user)
        })
        .catch((error) => {
            if (error.name === 'ValidationError' || error.name === 'CastError') {
                return res.status(ERROR_REQUEST).send({ message: 'Введенные данные некорректны!' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserAvatar
}