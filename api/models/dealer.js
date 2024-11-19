const sequelize = require('../config/connection');
const { Sequelize, DataTypes } = require('sequelize');

const Dealer = sequelize.define('dealer', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    endereco: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilepicurl: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    registration_date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo', 'suspenso'),
        defaultValue: 'ativo'
    },
    account_type: {
        type: DataTypes.ENUM('básica', 'premium'),
        defaultValue: 'básica'
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0.0
    },
    payment_methods: {
        type: DataTypes.TEXT, // Sequelize não tem tipo JSON válido para CHECK constraints
        allowNull: true,
        validate: {
            isJSON(value) {
                try {
                    JSON.parse(value);
                } catch (e) {
                    throw new Error('Campo payment_methods deve ser um JSON válido');
                }
            }
        }
    },
    cnpj: {
        type: DataTypes.STRING(18),
        allowNull: true,
        unique: true
    },
    cargo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});


sequelize.sync()
    .then(() => console.log('(usuarios) sincronizada!'))
    .catch((error) => console.error('Erro ao sincronizar tabela de produtos:', error));

module.exports = Dealer;