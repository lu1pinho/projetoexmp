const sequelize = require('../config/connection');
const { Sequelize, DataTypes } = require('sequelize');

const Produto = sequelize.define('produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oferta_dia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    frete_gratis: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantidadeVendida: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    avaliacaoMedia: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
}, {
    tableName: 'produtos',  // Nome da tabela no banco de dados
    timestamps: false      // Caso você não tenha campos de data
});

// Sincroniza os modelos com o banco de dados
sequelize.sync()
    .then(() => console.log('(produtos) sincronizada!'))
    .catch((error) => console.error('Erro ao sincronizar tabela de produtos:', error));

module.exports = Produto;
