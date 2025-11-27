const Produto = require('../models/Produto');
const listarProdutos = async (req, res, next) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        next(error);
    }
};

const obterProduto = async (req, res, next) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.status(200).json(produto);
    } catch (error) {
        next(error);
    }
};

const criarProduto = async (req, res, next) => {
    try {
        const { nome, preco, estoque, descricao } = req.body;

        if (!nome || preco == null || estoque == null) {
            return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios.' });
        }

        const novoProduto = await Produto.create({ nome, preco, estoque, descricao });
        res.status(201).json(novoProduto);
    } catch (error) {
        next(error);
    }
};

const atualizarProduto = async (req, res, next) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        const { nome, preco, estoque, descricao } = req.body;

        produto.nome = nome ?? produto.nome;
        produto.preco = preco ?? produto.preco;
        produto.estoque = estoque ?? produto.estoque;
        produto.descricao = descricao ?? produto.descricao;

        const produtoAtualizado = await produto.save();
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        next(error);
    }
};

const deletarProduto = async (req, res, next) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        await produto.deleteOne();
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listarProdutos,
    obterProduto,
    criarProduto,
    atualizarProduto,
    deletarProduto
};
