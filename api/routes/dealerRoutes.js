const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealerController');

// Rotas para usuários
router.get('/test', dealerController.testRoute);
router.put('/update/:id', dealerController.updateDealerInfo);
router.patch('/update/todealer/:id', dealerController.updateToDealerRole);
router.patch('/update/touser/:id', dealerController.updateToUserRole);
router.get('/checkdealer/:id', dealerController.checkIfDealer);
router.get('/rating/:id', dealerController.getDealerRating);



module.exports = router;