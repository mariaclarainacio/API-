const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const gerarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe com este e-mail.' });
        }

        const usuario = await User.create({ name, email, password });

        return res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            usuario: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: gerarToken(usuario._id)
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
        }

        const senhaValida = await usuario.comparePassword(password);
        if (!senhaValida) {
            return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
        }

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            usuario: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: gerarToken(usuario._id)
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao realizar login.' });
    }
};

module.exports = { register, login };
