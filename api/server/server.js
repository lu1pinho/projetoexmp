const express = require('express');
const app = express();
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const dealerRoutes = require('../routes/dealerRoutes');
const cepRoutes = require('../routes/cepRoutes');
const cardsRoutes = require('../routes/cardsRoutes');

app.use(express.json()); // Middleware para processar JSON

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dealer', dealerRoutes);
app.use('/api/cep/', cepRoutes);
app.use('/api/cards/', cardsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
