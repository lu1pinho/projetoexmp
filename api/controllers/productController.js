const Produto = require('../models/produto');
const sequelize = require('../config/connection.js');
const { Op } = require('sequelize');

// Função para obter todos os produtos
const getAllProducts = async (req, res) => {
    try {
        const products = await Produto.findAll();
        res.status(200).json({
            status: "success",
            message: "Produtos encontrados com sucesso!",
            data: products
        });
    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        res.status(500).json({
            status: "error",
            message: "Erro ao buscar produtos.",
            error: err.message
        });
    }
};

// Função para obter um produto por ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Produto.findByPk(id);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Produto não encontrado."
            });
        }
        res.status(200).json({
            status: "success",
            message: "Produto encontrado com sucesso!",
            data: product
        });
    } catch (err) {
        console.error("Erro ao consultar produto:", err);
        res.status(500).json({
            status: "error",
            message: "Erro ao consultar o produto.",
            error: err.message
        });
    }
};

// Função para criar um novo produto
const createProduct = async (req, res) => {
    const {
        nome, shortDescription, longDescription, preco, estoque, categoria, marca, desconto,
        oferta_dia, dataOfertaInicio, dataOfertaFim, vendedor_id, localizacaoVendedor, image_url,
        imagens_adicionais, avaliacaoMedia, quantidadeVendida, comentarios, produtoAtivo, garantia,
        frete_gratis
    } = req.body;

    try {
        const existingProduct = await Produto.findOne({ where: { nome } });

        if (existingProduct) {
            return res.status(400).json({
                status: "error",
                message: "Produto já existe com esse nome."
            });
        }

        const newProduct = await Produto.create({
            nome, shortDescription, longDescription, preco, estoque, categoria, marca, desconto,
            oferta_dia, dataOfertaInicio, dataOfertaFim, vendedor_id, localizacaoVendedor, image_url,
            imagens_adicionais, avaliacaoMedia, quantidadeVendida, comentarios, produtoAtivo, garantia,
            frete_gratis
        });

        res.status(201).json({
            status: "success",
            message: "Produto criado com sucesso!",
            data: { id: newProduct.id }
        });
    } catch (err) {
        console.error("Erro ao criar produto:", err);
        res.status(500).json({
            status: "error",
            message: "Erro ao criar produto.",
            error: err.message
        });
    }
};

// Função para atualizar um produto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    try {
        const [updatedRows] = await Produto.update(productData, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({
                status: "error",
                message: "Produto não encontrado para atualização."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Produto atualizado com sucesso!"
        });
    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        res.status(500).json({
            status: "error",
            message: "Erro ao atualizar produto.",
            error: err.message
        });
    }
};

// Função para deletar um produto
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Produto.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({
                status: "error",
                message: "Produto não encontrado para exclusão."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Produto excluído com sucesso!"
        });
    } catch (err) {
        console.error("Erro ao excluir produto:", err);
        res.status(500).json({
            status: "error",
            message: "Erro ao excluir produto.",
            error: err.message
        });
    }
};

// Função para buscar produtos com filtros
const searchProductsWithFilters = async (req, res) => {
    const { preco_min, preco_max, categoria, oferta_dia, frete_gratis, marca, mais_vendidos, mais_bem_avaliados } = req.query;

    try {
        let whereConditions = {};
        let order = [];

        if (preco_min) whereConditions.preco = { [Op.gte]: parseFloat(preco_min) };
        if (preco_max) whereConditions.preco = { ...whereConditions.preco, [Op.lte]: parseFloat(preco_max) };
        if (categoria) whereConditions.categoria = categoria.trim();
        if (oferta_dia) whereConditions.oferta_dia = parseInt(oferta_dia);
        if (frete_gratis) whereConditions.frete_gratis = parseInt(frete_gratis);
        if (marca) whereConditions.marca = marca.trim();

        if (mais_vendidos) order.push(['quantidadeVendida', 'DESC']);
        if (mais_bem_avaliados) order.push(['avaliacaoMedia', 'DESC']);

        const products = await Produto.findAll({ where: whereConditions, order });

        if (products.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Nenhum produto encontrado com os filtros especificados.",
                queryFilters: req.query
            });
        }

        res.status(200).json({
            status: "success",
            message: "Busca realizada com sucesso.",
            queryFilters: req.query,
            data: products
        });
    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        res.status(500).json({
            status: "error",
            message: "Erro ao buscar produtos.",
            error: err.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProductsWithFilters
};
