const Joi = require('joi');

const createProdutoSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  preco: Joi.number().positive().required(),
  estoque: Joi.number().integer().min(0).required(),
  descricao: Joi.string().allow('', null)
});

const updateProdutoSchema = Joi.object({
  nome: Joi.string().min(2),
  preco: Joi.number().positive(),
  estoque: Joi.number().integer().min(0),
  descricao: Joi.string().allow('', null)
}).min(1);

module.exports = { createProdutoSchema, updateProdutoSchema };