const express = require('express');
const router = express.Router();
const adressController = require('../controllers/adressController'); // Certifique-se de que a rota está correta
const userController = require("../controllers/userController");

// Rotas de Cep
router.get('/:cep', adressController.getCepInfo);

// Rotas de Distância
router.get('/distance/getdist/:cep1/:cep2', adressController.getDistance);

// Rotas de Preço de Frete
router.get('/frete/getprice/:cep1/:cep2/:type', adressController.estimateDeliveryPrice);

// Exportando as rotas
module.exports = router;
