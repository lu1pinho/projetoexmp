require('dotenv').config();  // Para carregar as variáveis de ambiente do .env
const { Sequelize } = require('sequelize');

// Lendo as variáveis do arquivo .env
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'expressmp';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

// Opções de conexão
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: process.env.SHOW_CONNECTION_STATUS === 'true',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
    }
};

// Teste da conexão ao iniciar o servidor
testConnection();

// Exportando a instância do Sequelize para ser usada nos controladores
module.exports = sequelize;
