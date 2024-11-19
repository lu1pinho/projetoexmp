const sequelize = require('../config/connection');
const { Sequelize, DataTypes } = require('sequelize');

const CreditCard = sequelize.define('creditCard', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    card_number: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    expiry_date: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    holder_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ccv: {
        type: DataTypes.STRING(4),
        allowNull: false
    }
}, {
    tableName: 'credit_cards',
    timestamps: false
});

// Sincroniza o modelo com o banco de dados
sequelize.sync()
    .then(() => console.log('(credit_cards) sincronizada!'))
    .catch((error) => console.error('Erro ao sincronizar tabela de cartões de crédito:', error));

module.exports = CreditCard;
