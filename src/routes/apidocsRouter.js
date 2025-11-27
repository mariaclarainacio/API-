const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "Bem-vindo à API!",
        rotas: {
            "/api/auth": "Autenticação",
            "/api/produtos": "Gerenciamento de produtos",
            "/api/usuarios": "Gerenciamento de usuários"
        }
    });
});

module.exports = router;
