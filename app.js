const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env
const app = express()

const usersRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

app.use(express.json())
app.use((req, res, next) => {
    req.user = {
        _id: '61241a178b785908c694f8fa',
    }
    next()
})

app.use('/', usersRouter)
app.use('/', cardsRouter)
app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})