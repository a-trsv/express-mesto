const Card = require('../models/card')

// Errors

//400 -> переданы некорректные данные
const RequestError = require('../middlewares/errors/request-error')
//404 -> карточка/пользователь не найдены
const NotFoundError = require('../middlewares/errors/not-found-error')
//401 -> ошибка аутентификации/авторизации
const UnauthorizedError = require('../middlewares/errors/error-unathorized')

const getCards = (req, res, next) => {
    Card.find({})
        .then(cards => {
            res.status(200).send(cards)
        })
       .catch(next)
}

const createCard = (req, res, next) => {
    const { name, link } = req.body
    const owner = req.user._id
    Card.create({ name, link, owner})
        .then(card => {
            res.send(card)
        })
        .catch((error) => {
            if (error.name === 'ValidationError') {
                console.log(error)
                next(new RequestError('Введенные данные некорректны!'))
            } else {
                next(error)
            }
        })
        .catch(next)
}

// feat: сначала проверить права на удаление карточки, затем удалить
const deleteCard = (req, res, next) => {
    Card.findById(req.params.cardId)
    .orFail(new NotFoundError('card не найденa с таким id!'))
    .then((card) => {
        if (card.owner.toString() !== req.user._id) {
            next (new NotFoundError('Запрашиваемая карточка не найдена'))
        } else {
            Card.findByIdAndDelete(req.params.cardId)
                    .then (() => {
                        res.status(200).send(card)
                    })
        }
    })
    .catch((error) => {
        if (error.name === 'CastError') {
            console.log(req.params.cardId)
            next(new RequestError('Введенные данные некорректны!'))
        } else {
            next(error)
        }
    })
        // .then((card) => {
        //     if (!card) {
        //         throw new NotFoundError('Запрашиваемая карточка не найдена')
        //     } else if (card.owner.toString() !== cardId) {
        //         throw new UnauthorizedError('Недостаточно прав для удаления карточки')
        //     } else {
        //         Card.findByIdAndRemove(cardId)
        //         .then ((card) => {
        //             res.status(200).send(card)
        //         })
        //     }
        // })
        // .catch(next)
}

const likeCard = (req, res, next) => {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
        .then((card) => {
            res.status(200).send(card)
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                console.log(error)
                next(new RequestError('Введенные данные некорректны!'))
            } else {
                next(error)
            }
        })
}


const dislikeCard = (req, res, next) => {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
        .then((card) => {
            res.status(200).send(card)
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                next(new RequestError('Введенные данные некорректны!'))
            } else {
                next(error)
            }
        })
}

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}