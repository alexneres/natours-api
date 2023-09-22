const Tour = require('../models/tour')

const getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])
    const query = Tour.find(queryObj)

    const tours = await query

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    })
  } catch (error) {
    res.status(404).json({ status: 'fail', message: "There's no tours" })
  }
}

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: { tour },
    })
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'Not Found!' })
  }
}

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      message: newTour,
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent!' })
  }
}

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: { tour },
    })
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'Not Found!' })
  }
}

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'Not Found!' })
  }
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
}
