require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRouter = require('./routes/authRouter');
const produtosRouter = require('./routes/produtosRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const taskRouter = require('./routes/taskRoutes'); 

let swaggerSetup;
try {
  swaggerSetup = require('./docs/swagger');
} catch (err) {
  swaggerSetup = null;
}

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/produtos`, produtosRouter);
app.use(`${API_PREFIX}/usuarios`, usuariosRouter);
if (taskRouter) app.use(`${API_PREFIX}/tasks`, taskRouter);

app.get('/', (req, res) => res.send('API funcionando! 🚀'));

if (swaggerSetup) {
  swaggerSetup(app); 
}

app.use(errorHandler);

module.exports = app;