const Card = require('../models/card')

// Errors

//400 -> переданы некорректные данные
const ERROR_REQUEST = 400
//404 -> карточка/пользователь не найдены
const ERROR_CODE = 404
//500 -> ошибка по-умолчанию
const SERVER_ERROR = 500

const getCards = (req, res) => {
    Card.find({})
        .then(cards => {
            if (cards.length === 0) {
                res.status(ERROR_CODE).send({ message: 'Запрашиваемые карточки не найдены' })
                return
            }
            res.status(200).send(cards)
        })
        .catch((error) => res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        )
}

const createCard = (req, res) => {
    const { name, link } = req.body
    Card.create({ name, link, owner: req.user._id })
        .then(card => {
            res.status(200).send(card)
        })
        .catch((error) => {
            if (error.name === 'ValidationError') {
                return res.status(ERROR_REQUEST).send({ message: 'Введенные данные некорректны!' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

const deleteCard = (req, res) => {
    const { cardId } = req.params
    Card.findByIdAndRemove(cardId)
        .then((card) => {
            if (!card) {
                res.status(ERROR_CODE).send({ message: 'Запрашиваемые карточкa не найдены' })
                return
            }
            res.status(200).send(card)
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                return res.status(ERROR_REQUEST).send({ message: 'Передан некорректный _id' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

const likeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
        .then((card) => {
            if (!card) {
                res.status(ERROR_CODE).send({ message: 'Запрашиваемые карточкa не найдены' })
                return
            }
            res.status(200).send(card)
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                return res.status(ERROR_REQUEST).send({ message: 'Некорректные данные для постановки лайка' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}


const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
        .then((card) => {
            if (!card) {
                res.status(ERROR_CODE).send({ message: 'Запрашиваемые карточкa не найдены' })
                return
            }
            res.status(200).send(card)
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                return res.status(ERROR_REQUEST).send({ message: 'Некорректные данные для снятия лайка' })
            }
            res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${error}` })
        })
}

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}