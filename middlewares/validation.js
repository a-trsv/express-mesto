const { celebrate, Joi } = require('celebrate')

const signInValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8)
    }),
})

const signUpValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().min(2).max(30)
    }),
})

const userIdValidation = celebrate({
    params: Joi.object().keys({
        userId: Joi.string().hex().length(24),
    })
})

const cardIdValidation = celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().hex().length(24),
    })
})

const userUpdateValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30)
    })
})

const userAvatarUpdateValidation = celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().min(2).max(30)
    })
})


module.exports = {
    signInValidation,
    signUpValidation,
    userIdValidation,
    userUpdateValidation,
    userAvatarUpdateValidation,
    cardIdValidation
}