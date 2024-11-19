const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardsController');

router.get('/getcard/:cardNumber', cardController.getCardByNumber); //ok
router.get('/getcards/:userId', cardController.getUserCards); //ok
router.get('/getbrand/:cardNumber', cardController.verifyBrand); //ok
router.get('/getcard/owner/:userId/:cardNumber', cardController.verifyCardPertance); //ok

router.post('/', cardController.addCard); // Ok
router.put('/editcard/', cardController.editCard); // Ok
router.delete('/deletecard/', cardController.deleteCard); // Ok

module.exports = router;
