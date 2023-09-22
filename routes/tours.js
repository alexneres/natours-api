const express = require('express')
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tour')

const router = express.Router()

// router.param('id', isValidID)

router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
