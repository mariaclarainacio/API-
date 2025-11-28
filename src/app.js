require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRoutes');
const produtosRouter = require('./routes/produtosRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const apidocsRouter = require('./routes/apidocsRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/produtos', produtosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/docs', apidocsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

module.exports = app;