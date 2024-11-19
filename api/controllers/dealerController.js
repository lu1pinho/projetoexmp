const Dealer = require('../models/dealer');
const Users = require('../models/user');
const sequelize = require('../config/connection.js');
const { Op } = require('sequelize');

/** Rota de teste */
const testRoute = async (req, res) => {
    res.status(200).json({ message: "Rota de teste funcionando!" });
}

/** Atualiza informações do dealer.*/
const updateDealerInfo = async (req, res) => {
    try{
        if (req.body.payment_methods) {
            req.body.payment_methods = JSON.stringify(req.body.payment_methods);
        }
        const dealer = await Dealer.findByPk(req.params.id);
        if(dealer){
            await dealer.update(req.body);
            res.status(200).json(dealer);
        } else{
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

/** Atualiza o cargo do usuário para dealer */
const updateToDealerRole = async (req, res) => {
    try{
        const user = await Users.findByPk(req.params.id);
        if(user){
            await user.update({cargo: '1'});
            res.status(200).json(user);
        } else{
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

/** Atualiza o cargo do usuário para user */
const updateToUserRole = async (req, res) => {
    try{
        const user = await Users.findByPk(req.params.id);
        if(user){
            await user.update({cargo: '0'});
            res.status(200).json(user);
        } else{
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

const checkIfDealer = async (req, res, next) => {
    try{
        const user = await Users.findByPk(req.params.id);
        if(user){
            if(user.cargo === true){
                res.status(200).json({ message: "Usuário é um dealer" });
            } else{
                res.status(403).json({ message: "Usuário não é um dealer" });
            }
        } else{
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

const getDealerRating = async (req, res) => {
    try{
        const dealer = await Dealer.findByPk(req.params.id);
        if(dealer){
            res.status(200).json(dealer.rating);
        } else{
            res.status(404).json({ message: "Dealer não encontrado" });
        }
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    testRoute,
    updateToDealerRole,
    updateToUserRole,
    updateDealerInfo,
    checkIfDealer, getDealerRating
}


