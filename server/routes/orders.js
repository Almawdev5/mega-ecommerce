const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { uploadPayment } = require('../middleware/upload');

router.post('/', uploadPayment.single('paymentProof'), createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

module.exports = router;