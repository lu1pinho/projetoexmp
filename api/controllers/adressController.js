const axios = require('axios');

// Função para pegar as informações de um CEP específico
const getCepInfo = async (req, res) => {
    const cep = req.params.cep;
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return res.status(404).send('CEP não encontrado');
        } else {
            return res.json(response.data);
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        return res.status(500).send('Erro ao consultar o CEP');
    }
};

/**
 * Função para calcular a distância entre dois CEPs.
 * Busca por dois parâmetros na url, cep1 e cep2.
 */
const getDistance = async (req, res) => {
    const cep1 = req.params.cep1;
    const cep2 = req.params.cep2;

    const googleApiKey = process.env.GOOGLE_API_KEY;

    try {
        console.log("Iniciando cálculo de distância entre CEPs:", cep1, cep2);

        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: `postal_code:${cep1},BR`,
                destinations: `postal_code:${cep2},BR`,
                key: googleApiKey,
                mode: 'driving',
                units: 'metric'
            }
        });

        console.log("Resposta da API do Google:", JSON.stringify(response.data, null, 2));

        if (response.data.status !== 'OK') {
            return res.status(400).json({ error: 'Erro na resposta da API do Google.', details: response.data });
        }

        const element = response.data.rows[0]?.elements[0];
        if (!element || element.status !== 'OK') {
            return res.status(400).json({ error: 'Não foi possível calcular a distância.', details: element });
        }

        const distanceInKm = element.distance.value / 1000; // Converte metros para quilômetros
        const duration = element.duration.text;

        return res.json({
            origem: response.data.origin_addresses[0],
            destino: response.data.destination_addresses[0],
            distancia: `${distanceInKm} km`,
            duracao: duration
        });
    } catch (error) {
        console.error("Erro ao calcular a distância:", error.message);
        return res.status(500).json({ error: 'Erro interno ao calcular a distância.', details: error.message });
    }
};

const estimateDeliveryPrice = async (req, res) => {
    const km_price = parseFloat(process.env.KM_PRICE);
    const km_price_plus = parseFloat(process.env.KM_PRICE_PLUS);
    const km_price_express = parseFloat(process.env.KM_PRICE_EXPRESS);

    const { cep1, cep2, type } = req.params;
    const googleApiKey = process.env.GOOGLE_API_KEY;

    try {
        // Google Distance Matrix
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: `postal_code:${cep1},BR`,
                destinations: `postal_code:${cep2},BR`,
                key: googleApiKey,
                mode: 'driving',
                units: 'metric'
            }
        });

        console.log("Resposta da API do Google:", JSON.stringify(response.data, null, 2));

        if (response.data.status !== 'OK') {
            return res.status(400).json({ error: 'Erro na resposta da API do Google.', details: response.data });
        }

        const element = response.data.rows[0]?.elements[0];
        if (!element || element.status !== 'OK') {
            return res.status(400).json({ error: 'Não foi possível calcular a distância.', details: element });
        }

        const distanceInKm = element.distance.value / 1000; // Converte metros para quilômetros
        const duration = element.duration.text;

        // Calculando o preço da entrega baseado na distância e tipo
        let deliveryPrice;
        switch (type) {
            case 'normal':
                deliveryPrice = distanceInKm * km_price;
                break;
            case 'express':
                deliveryPrice = distanceInKm * km_price_express;
                break;
            case 'plus':
                deliveryPrice = distanceInKm * km_price_plus;
                break;
            default:
                return res.status(400).json({ error: 'Tipo de entrega inválido. Escolha entre normal, express ou plus.' });
        }

        return res.status(200).json({
            origem: response.data.origin_addresses[0],
            destino: response.data.destination_addresses[0],
            distancia: `${distanceInKm} km`,
            duracao: duration,
            deliveryPrice
        });

    } catch (error) {
        console.error('Erro ao estimar o preço de entrega:', error.message);
        return res.status(500).json({ error: 'Erro interno ao calcular o preço de entrega.' });
    }
};

module.exports = {
    getCepInfo,
    getDistance,
    estimateDeliveryPrice
};

