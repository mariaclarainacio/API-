const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true },
    descricao: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Produto', ProdutoSchema);
