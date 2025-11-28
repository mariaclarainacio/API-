const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const protect = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');

const { createProdutoSchema, updateProdutoSchema } = require('../validators/produtoValidators');

router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.obterProduto);

router.post('/', protect, validate(createProdutoSchema), produtoController.criarProduto);
router.put('/:id', protect, validate(updateProdutoSchema), produtoController.atualizarProduto);
router.delete('/:id', protect, produtoController.deletarProduto);

module.exports = router;