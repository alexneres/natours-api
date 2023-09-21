const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' })
})

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...')
})

app.listen(port, () => {
  console.log('App running on port ', port)
})
