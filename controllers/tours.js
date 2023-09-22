const fs = require('fs')
const path = require('path')

const dataFile = path.join(__dirname, '/../dev-data/data/tours-simple.json')

const tours = JSON.parse(fs.readFileSync(dataFile))

const isValidID = (req, res, next, value) => {
  const id = Number(value)
  if (id > tours.length || id < 1) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' })
  }
  next()
}

const isValidBody = (req, res, next) => {
  const { name, price } = req.body
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing params',
    })
  }
  next()
}

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours })
}

const getTour = (req, res) => {
  const id = Number(req.params.id)

  const tour = tours.find((element) => element.id === id)

  res.status(200).json({ status: 'success', data: tour })
}

const createTour = (req, res) => {
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
}

const updateTour = (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((element) => element.id === id)
  res.status(200).json({ status: 'success', data: tour })
}

const deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null })
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  isValidID,
  isValidBody,
}
