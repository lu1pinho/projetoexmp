const Card = require('../models/cards');
const sequelize = require('../config/connection.js');
const { Op } = require('sequelize');

const addCard = async (req, res) => {
    const { userId, cardNumber, ccv, expiryDate, holderName} = req.body;

    try {
        // Verifica se o cartão já foi cadastrado para o mesmo usuário
        const existingCardForUser = await Card.findOne({
            where: { card_number: cardNumber, user_id: userId }
        });

        if (existingCardForUser) {
            return res.status(400).json({ message: 'Este cartão já foi cadastrado por você.' });
        }

        // Verifica se o cartão já foi cadastrado por outro usuário
        const existingCardForOtherUser = await Card.findOne({
            where: { card_number: cardNumber }
        });

        if (existingCardForOtherUser) {
            return res.status(400).json({ message: 'Este cartão já foi cadastrado por outro usuário.' });
        }

        let cardType = verifyCardBrand(cardNumber);
        if(cardType === 'Brand Desconhecido!') {
            return res.status(400).json({ message: 'Cartão inválido!' });
        }

        // Se o cartão não existir para nenhum usuário, insere o novo cartão
        const newCard = await Card.create({
            user_id: userId,
            card_number: cardNumber,
            ccv: ccv,
            expiry_date: expiryDate,
            holder_name: holderName,
            type: cardType
        });

        return res.status(201).json({ message: 'Cartão cadastrado com sucesso!', card: newCard });
    } catch (error) {
        console.error('Erro ao adicionar o cartão:', error);
        return res.status(500).json({ message: error.message });
    }
};

const editCard = async (req, res) => {
    const { userId, cardNumber, ccv, expiryDate, holderName, newNumber} = req.body;

    try {
        // Verifica se o cartão já foi cadastrado para o mesmo usuário
        const existingCardForUser = await Card.findOne({
            where: { card_number: cardNumber, user_id: userId }
        });

        if (!existingCardForUser) {
            return res.status(400).json({ message: 'Este cartão não foi cadastrado por você.' });
        }

        // Verifica a marca do cartão
        let cardType = verifyCardBrand(cardNumber);
        if (cardType === 'Brand Desconhecido!') {
            return res.status(400).json({ message: 'Cartão inválido!' });
        }

        // Atualiza o cartão com os novos dados
        const updatedCard = await existingCardForUser.update({
            card_number: newNumber,
            ccv: ccv,
            expiry_date: expiryDate,
            holder_name: holderName,
            type: cardType
        });

        // Retorna a resposta de sucesso com o cartão atualizado
        return res.status(200).json({ message: 'Cartão atualizado com sucesso!', card: updatedCard });
    } catch (error) {
        console.error('Erro ao atualizar o cartão:', error);
        return res.status(500).json({ message: error.message });
    }
};

const getUserCards = async (req, res) => {
    const { userId } = req.params;

    try {
        // Busca os cartões do usuário
        const userCards = await Card.findAll({
            where: { user_id: userId }
        });

        return res.status(200).json({ cards: userCards });
    } catch (error) {
        console.error('Erro ao buscar os cartões do usuário:', error);
        return res.status(500).json({ message: error.message });
    }
}

const getCardByNumber = async (req, res) => {
    const { cardNumber } = req.params;  // Obtendo o número do cartão da URL

    try {
        // Busca o cartão pelo número
        const card = await Card.findOne({
            where: { card_number: cardNumber }
        });

        if (!card) {
            // Caso o cartão não seja encontrado
            return res.status(404).json({ message: 'Cartão não encontrado' });
        }

        // Retorna o cartão se encontrado
        return res.status(200).json(card);
    } catch (error) {
        console.error('Erro ao buscar o cartão pelo número:', error);
        return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
}

const verifyCardPertance = async (userId, cardNumber) => {
    try {
        console.log("Procurando pelo cartão:", cardNumber);

        // Busca o cartão pelo número
        const card = await Card.findOne({
            where: { card_number: cardNumber }
        });

        // Se o cartão não for encontrado
        if (!card) {
            console.log("Cartão não encontrado na base de dados.");
            return { status: false, message: 'Cartão não encontrado.' };
        }

        // Verifica se o cartão pertence ao usuário
        console.log("Cartão encontrado, verificando o user_id...");
        if (card.user_id !== userId) {
            console.log(`O cartão não pertence ao usuário com ID ${userId}`);
            return { status: false, message: 'Este cartão não pertence ao usuário informado.' };
        }

        // Se o cartão pertence ao usuário
        return { status: true, message: 'O cartão pertence ao usuário.' };
    } catch (error) {
        console.error('Erro ao verificar a pertença do cartão:', error);
        return { status: false, message: 'Erro ao verificar a pertença do cartão. Tente novamente mais tarde.' };
    }
}

const deleteCard = async (req, res) => {
    const { userId, cardNumber } = req.body;

    try {
        // Verifica se o cartão já foi cadastrado para o mesmo usuário
        const existingCardForUser = await Card.findOne({
            where: { card_number: cardNumber, user_id: userId }
        });

        if (!existingCardForUser) {
            return res.status(400).json({ message: 'Este cartão não foi cadastrado por você.' });
        }

        // Deleta o cartão
        await existingCardForUser.destroy();

        return res.status(200).json({ message: 'Cartão deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar o cartão:', error);
        return res.status(500).json({ message: error.message });
    }
}

const verifyBrand = async (req, res) => {
    const { cardNumber } = req.params;

    try {
        let cardType = verifyCardBrand(cardNumber);
        return res.status(200).json({ brand: cardType });
    } catch (error) {
        console.error('Erro ao verificar a bandeira do cartão:', error);
        return res.status(500).json({ message: error.message });
    }
}

// Função interna para verificar a bandeira do cartão
function verifyCardBrand(cardNumber) {
    // Remove qualquer espaço ou caractere não numérico
    cardNumber = cardNumber.replace(/\D/g, '');

    // Verifica o comprimento do número do cartão
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return 'Número de cartão inválido'; // Cartões normalmente possuem entre 13 e 19 dígitos
    }

    // Visa: começa com 4
    if (/^4/.test(cardNumber)) {
        return 'Visa';
    }

    // MasterCard: começa com 51 a 55 ou entre 2221 e 2720
    if (/^5[1-5]/.test(cardNumber) || /^2[2-7][0-9]{2}/.test(cardNumber)) {
        return 'MasterCard';
    }

    // American Express (AmEx): começa com 34 ou 37
    if (/^34|^37/.test(cardNumber)) {
        return 'American Express';
    }

    // Discover: começa com 6011, 622126 a 622925, 644-649 ou 65
    if (/^6011/.test(cardNumber) || /^6221[2-9]/.test(cardNumber) || /^622[2-9][0-9]{3}/.test(cardNumber) || /^64[4-9]/.test(cardNumber) || /^65/.test(cardNumber)) {
        return 'Discover';
    }

    // JCB: começa com 3528 a 3589
    if (/^35[2-8][0-9]/.test(cardNumber)) {
        return 'JCB';
    }

    // Diners Club International: começa com 300 a 305, 36 ou 38
    if (/^30[0-5]/.test(cardNumber) || /^36/.test(cardNumber) || /^38/.test(cardNumber)) {
        return 'Diners Club';
    }

    return 'Brand Desconhecido!';
}


module.exports = {
    addCard,
    editCard,
    deleteCard,
    getUserCards,
    getCardByNumber,
    verifyBrand,
    verifyCardPertance
};