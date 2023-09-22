const fs = require('fs')
const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

const dataFile = path.join(__dirname, '/dev-data/data/tours-simple.json')

const tours = JSON.parse(fs.readFileSync(dataFile))

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours })
})

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id)

  if (id > tours.length || id < 1) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' })
  }

  const tour = tours.find((element) => element.id === id)

  res.status(200).json({ status: 'success', data: tour })
})

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(dataFile, JSON.stringify(tours), (error) => {
    console.error(error)
  })

  res.status(201).json({
    status: 'success',
    data: {
      tour: req.body,
    },
  })
})

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id)

  if (id > tours.length || id < 1) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' })
  }

  const tour = tours.find((element) => element.id === id)

  res.status(200).json({ status: 'success', data: tour })
})

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id)

  if (id > tours.length || id < 1) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' })
  }
  res.status(204).json({ status: 'success', data: null })
})

app.listen(port, () => {
  console.log('App running on port ', port)
})
