const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProduct } = require('../middleware/upload');

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, uploadProduct.single('image'), createService);
router.put('/:id', protect, uploadProduct.single('image'), updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;