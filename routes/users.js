const userRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')

const {
    getUsers,
    getUserById,
    getCurrentUser,
    updateUser,
    updateUserAvatar
} = require('../controllers/users')

userRouter.get('/users', getUsers)
userRouter.get('/users/me', getCurrentUser)
userRouter.get('/users/:userId', 
celebrate({
    params: Joi.object().keys({
        userId: Joi.string().hex().length(24),
    })
}), 
getUserById)
userRouter.patch('/users/me', 
celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30)
    })
}), 
updateUser)
userRouter.patch('/users/me/avatar', 
celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().min(2).max(30)
    })
}), 
updateUserAvatar)

module.exports = userRouter