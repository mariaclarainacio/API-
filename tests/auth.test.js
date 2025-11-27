const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('Auth Endpoints', () => {

    it('Deve registrar um novo usuário', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Clara',
                email: 'clara@email.com',
                password: 'minhasenha123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Usuário registrado com sucesso!');
        expect(res.body.usuario).toHaveProperty('id');
        expect(res.body.usuario).toHaveProperty('token');
        expect(res.body.usuario).toHaveProperty('name', 'Clara');
        expect(res.body.usuario).toHaveProperty('email', 'clara@email.com');
    });

    it('Deve logar um usuário existente', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'clara@email.com',
                password: 'minhasenha123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Login realizado com sucesso!');
        expect(res.body.usuario).toHaveProperty('token'); 
        expect(res.body.usuario).toHaveProperty('id');
        expect(res.body.usuario).toHaveProperty('name', 'Clara');
        expect(res.body.usuario).toHaveProperty('email', 'clara@email.com');
    });

});
