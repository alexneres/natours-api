const express = require('express')
const morgan = require('morgan')
const path = require('path')

const userRouter = require('./routes/users')
const tourRouter = require('./routes/tours')

const app = express()

const publicFolder = path.join(__dirname, '/public')
app.use(express.static(publicFolder))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use((req, res, next) => {
  console.log('Hello, from the middleware!')
  next()
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
