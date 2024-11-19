const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Address extends Model {}

    Address.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            cep: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            logradouro: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            complemento: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            numero: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            bairro: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            localidade: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            uf: {
                type: DataTypes.CHAR(2),
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            regiao: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            usuario_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'usuarios', // Nome da tabela de referência
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName: 'Address', // Nome do modelo
            tableName: 'enderecos', // Nome da tabela no banco de dados
            timestamps: false, // Se não usar campos createdAt/updatedAt
            charset: 'utf8',
            collate: 'utf8_bin',
        }
    );

    return Address;
};
