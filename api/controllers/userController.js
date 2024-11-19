const User = require('../models/user');
const Address = require('../models/adress'); // Corrigido o nome do modelo para "Address"
const sequelize = require("../config/connection");
const userController = require("../controllers/userController");
const { Op } = require('sequelize');
const addressController = require("../controllers/adressController");
const { getCepInfo } = require("./adressController");

// Função de teste da rota
const testRoute = async (req, res) => {
    res.status(200).json({ message: "Rota de teste funcionando!" });
};

// Lista todos os usuários
const listAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Adiciona um novo usuário
const addUser = async (req, res) => {
    try {
        if (req.body.payment_methods) {
            req.body.payment_methods = JSON.stringify(req.body.payment_methods);
        }
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Busca um usuário pelo ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualiza informações do usuário
const updateUser = async (req, res) => {
    try {
        if (req.body.payment_methods) {
            req.body.payment_methods = JSON.stringify(req.body.payment_methods);
        }
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deleta um usuário
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualiza ou cria o endereço do usuário
const setUserAddress = async (req, res) => {
    const { id, cep, complemento, numero } = req.params;

    try {
        // Busca o usuário pelo ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Obtém informações do CEP
        const address = await getCepInfo(cep);

        if (!address || address.erro) {
            return res.status(404).json({ message: "CEP não encontrado" });
        }

        // Monta o objeto de endereço
        const fullAddress = {
            cep,
            logradouro: address.logradouro,
            complemento,
            numero: parseInt(numero, 10),
            bairro: address.bairro,
            localidade: address.localidade,
            uf: address.uf,
            estado: address.uf, // Caso "estado" não seja necessário, remova.
            regiao: address.regiao // Opcional
        };

        // Atualiza ou cria o endereço na tabela "enderecos"
        const updatedAddress = await Address.upsert({
            usuario_id: id,
            ...fullAddress
        });

        // Retorna o endereço completo ao cliente
        return res.status(200).json({
            message: "Endereço atualizado com sucesso",
            endereco: fullAddress
        });
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    testRoute,
    listAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    setUserAddress
};
