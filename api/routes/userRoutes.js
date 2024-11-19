const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Rotas para usuários

router.get('/test', userController.testRoute);
router.get('/listall', userController.listAllUsers);

router.post('/add', userController.addUser);
router.get('/get/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.patch('/adress/:id/:cep/:complemento/:numero', userController.setUserAddress);

module.exports = router;