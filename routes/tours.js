const express = require('express')
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  isValidID,
  isValidBody,
} = require('../controllers/tours')

const router = express.Router()

router.param('id', isValidID)

router.route('/').get(getAllTours).post(isValidBody, createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
