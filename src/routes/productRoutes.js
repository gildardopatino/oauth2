const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { createProductValidator } = require('../validators/productValidator');

router.get('/product/list', productController.getProducts);
router.post('/product/create', createProductValidator , productController.createProduct);

module.exports = router;