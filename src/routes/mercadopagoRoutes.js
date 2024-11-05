const express = require('express');
const router = express.Router();
const mercadopagoController = require('../controllers/mercadoController');
const cartController = require('../controllers/cartController');

router.post('/crear-pago', mercadopagoController.crearPago);
router.post('/webhook/payments', mercadopagoController.webhook);
router.post('/save/payments', mercadopagoController.savePayment);
router.get('/sales', cartController.salesOfTheDay);

module.exports = router;