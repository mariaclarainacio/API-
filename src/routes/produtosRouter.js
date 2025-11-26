const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const protect = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas para CRUD de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Caneta
 */

router.get('/', produtoController.listarProdutos);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Obter um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */

router.get('/:id', produtoController.obterProduto);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Caneta
 *               preco:
 *                 type: number
 *                 example: 5.50
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

router.post('/', protect, produtoController.criarProduto);

router.put('/:id', protect, produtoController.atualizarProduto);
router.delete('/:id', protect, produtoController.deletarProduto);

module.exports = router;
