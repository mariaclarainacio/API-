jest.setTimeout(15000);
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Task = require('../src/models/Task');
const User = require('../src/models/User');
require('dotenv').config();

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
  await request(app).post('/api/auth/register').send({
    name: 'Teste Tasks',
    email: 'tasks_test@example.com',
    password: 'senha123'
  });

  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'tasks_test@example.com',
    password: 'senha123'
  });

  token = loginRes.body.token || (loginRes.body.usuario && loginRes.body.usuario.token);
  userId = loginRes.body.usuario ? loginRes.body.usuario.id : undefined;
});

afterAll(async () => {
  await Task.deleteMany({ owner: userId });
  await User.deleteMany({ email: 'tasks_test@example.com' });
  await mongoose.connection.close();
});

describe('Tasks API', () => {
  let taskId;

  test('Cria tarefa (POST /api/tasks)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarefa de teste', description: 'Descrição teste' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Tarefa de teste');
    taskId = res.body._id;
  });

  test('Lista tarefas do usuário (GET /api/tasks)', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Recupera tarefa por id (GET /api/tasks/:id)', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', taskId);
  });

  test('Atualiza tarefa (PUT /api/tasks/:id)', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true, title: 'Tarefa concluída' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('completed', true);
    expect(res.body).toHaveProperty('title', 'Tarefa concluída');
  });

  test('Deleta tarefa (DELETE /api/tasks/:id)', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Tarefa deletada com sucesso');
  });
});