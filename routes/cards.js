const cardRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')

const {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
} = require('../controllers/cards')

cardRouter.get('/cards/', getCards)
cardRouter.post('/cards', createCard)
cardRouter.delete('/cards/:cardId',
celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().hex().length(24),
    })
}),  deleteCard)
cardRouter.put('/cards/:cardId/likes', likeCard)
cardRouter.delete('/cards/:cardId/likes', dislikeCard)


module.exports = cardRouter