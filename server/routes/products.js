const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProduct } = require('../middleware/upload');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, uploadProduct.single('image'), createProduct);
router.put('/:id', protect, uploadProduct.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;