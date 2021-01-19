const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
//   updateOrderToDelivered,
  getMyOrders,
//   getOrders,
} = require('../controllers/orderControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports =  router