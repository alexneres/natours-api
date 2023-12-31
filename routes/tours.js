const express = require('express')
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tour')

const router = express.Router()

// router.param('id', isValidID)
router.route('/stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
