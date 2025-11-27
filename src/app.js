const express = require('express');
const cors = require('cors');
const taksRoutes = require('./routes/taskRoutes');
require('dotenv').config();
require('./config/db');

const authRouter = require('./routes/authRouter');
const produtosRouter = require('./routes/produtosRouter');
const usuariosRouter = require('./routes/usuariosRouter'); 

const swaggerSetup = require('./docs/swagger');

const app = express(); 

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/produtos', produtosRouter);
app.use('/api/usuarios', usuariosRouter); 
app.use('/api/tasks', taksRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando! 🚀');
});

swaggerSetup(app);

module.exports = app;
