const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Produto = require('../src/models/Produto');
const User = require('../src/models/User');
let token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    const userRes = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Clara',
            email: 'clara_produtos@email.com',
            password: 'minhasenha123'
        });

    token = userRes.body.usuario.token;
});

afterAll(async () => {
    await Produto.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('Produtos Endpoints', () => {
    let produtoId;

    it('Deve criar um novo produto', async () => {
        const res = await request(app)
            .post('/api/produtos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Caneta',
                preco: 5.5,
                estoque: 20
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('nome', 'Caneta');
        expect(res.body).toHaveProperty('preco', 5.5);
        expect(res.body).toHaveProperty('estoque', 20);

        produtoId = res.body._id; 
    });

    it('Deve listar todos os produtos', async () => {
        const res = await request(app)
            .get('/api/produtos');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Deve obter um produto pelo ID', async () => {
        const res = await request(app)
            .get(`/api/produtos/${produtoId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', produtoId);
    });

    it('Deve atualizar um produto', async () => {
        const res = await request(app)
            .put(`/api/produtos/${produtoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Caneta Azul',
                preco: 6.0,
                estoque: 25
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nome', 'Caneta Azul');
        expect(res.body).toHaveProperty('preco', 6.0);
        expect(res.body).toHaveProperty('estoque', 25);
    });

    it('Deve deletar um produto', async () => {
        const res = await request(app)
            .delete(`/api/produtos/${produtoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Produto deletado com sucesso');
    });
});
