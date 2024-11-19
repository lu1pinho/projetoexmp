const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rotas para produtos
router.get('/products', productController.getAllProducts);

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const produtos = await productController.getProductById(id);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/search/filter', (req, res, next) => {
    console.log("Rota /search/filter chamada");
    console.log("Query params recebidos:", req.query); // Exibe os parâmetros da query string
    next(); // Passa a execução para o próximo middleware (a função searchProductsWithFilters)
}, productController.searchProductsWithFilters);

module.exports = router;
