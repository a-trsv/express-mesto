const cardRouter = require('express').Router()

const {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
} = require('../controllers/cards')

const { cardIdValidation } = require('../middlewares/validation')

cardRouter.get('/cards/', getCards)
cardRouter.post('/cards', createCard)
cardRouter.delete('/cards/:cardId', cardIdValidation, deleteCard)
cardRouter.put('/cards/:cardId/likes', cardIdValidation, likeCard)
cardRouter.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard)


module.exports = cardRouter