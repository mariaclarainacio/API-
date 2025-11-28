# API-
API RESTful utilizando Express, MongoDB, JWT, validações e testes.
# 🛠️ API RESTful - Gestão de Produtos e Tarefas

Este projeto é uma API RESTful desenvolvida com **Node.js**, **Express** e **MongoDB**, incluindo:
- CRUD completo para **Produtos**
- CRUD completo para **Tarefas**
- Autenticação JWT
- Validação de dados com Joi
- Testes usando Jest + Supertest
- Documentação dos endpoints com Swagger
- Arquitetura organizada (controllers, models, routes, middlewares)
- Seguindo boas práticas REST

---

## 📌 Integrantes do Grupo
- **Maria Clara Inácio Costa e Silva** — Produtos, Organização da API, Documentação  
- **Matheus Augusto** — CRUD de Tarefas, Autenticação, Testes

*(Edite os nomes conforme os integrantes reais.)*

---

## 📦 Tecnologias Utilizadas
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Joi (validações)
- Jest + Supertest (testes)
- Swagger (documentação)
- Dotenv

---

# ⚙️ Como rodar o projeto

## 1. Clonar o repositório
```bash
git clone https://github.com/mariaclarainacio/API-.git
cd API-

2. Instalar dependências

npm install

3. Criar arquivo .env

Copiar:

cp .env.example .env

Preencher:

MONGODB_URI=mongodb://127.0.0.1:27017/sua_api
JWT_SECRET=seusecret
PORT=3000

4. Rodar o servidor

npm start

5. Rodar os testes

npm test


---

🗂️ Estrutura do Projeto

src/
 ├── controllers/
 │    ├── authController.js
 │    ├── productController.js
 │    └── taskController.js
 ├── middlewares/
 │    ├── authMiddleware.js
 │    └── validate.js
 ├── models/
 │    ├── Product.js
 │    ├── Task.js
 │    └── User.js
 ├── routes/
 │    ├── productRoutes.js
 │    ├── taskRoutes.js
 │    └── authRoutes.js
 ├── schemas/
 │    ├── productSchema.js
 │    └── taskSchema.js
 ├── docs/
 │    └── swagger.json
 └── app.js


---

🔐 Autenticação (JWT)

A autenticação usa tokens JWT.
Para acessar rotas protegidas, é necessário enviar:

Authorization: Bearer <seu_token>

O token é obtido no login:

POST /api/auth/login

{
  "email": "teste@email.com",
  "password": "123456"
}

Resposta:

{
  "message": "Login efetuado com sucesso",
  "token": "eyJhbGciOi..."
}


---

📦 Endpoints

A documentação completa está no Swagger:

➡️ /api-docs

Exemplos resumidos abaixo:


---

🛒 CRUD DE PRODUTOS

✔️ POST /api/produtos (protegido)

Cria um produto.

{
  "nome": "Lápis",
  "preco": 3.50,
  "estoque": 10
}

✔️ GET /api/produtos

Lista todos os produtos.

✔️ GET /api/produtos/:id

Retorna um produto pelo ID.

✔️ PUT /api/produtos/:id (protegido)

Atualiza um produto.

✔️ DELETE /api/produtos/:id (protegido)

Remove um produto.


---

📋 CRUD DE TAREFAS

✔️ POST /api/tasks (protegido)

{
  "title": "Estudar API",
  "description": "Fazer CRUD",
  "completed": false
}

✔️ GET /api/tasks

Lista tarefas do usuário autenticado.

✔️ GET /api/tasks/:id

Busca tarefa pelo ID.

✔️ PUT /api/tasks/:id (protegido)

Atualiza título, descrição ou status.

✔️ DELETE /api/tasks/:id (protegido)

Deleta uma tarefa.


---

🔍 Validações (Joi)

Produtos: nome obrigatório, preço numérico, estoque numérico

Tarefas: título obrigatório, boolean para completed

Autenticação: email válido + senha de no mínimo 6 caracteres



---

🧪 Testes (Jest + Supertest)

Foram implementados testes cobrindo:

Autenticação

CRUD de Produtos

CRUD de Tarefas

Validação

Retornos HTTP corretos


Para rodar:

npm test


---

📘 Documentação (Swagger)

A API possui documentação interativa:

➡️ http://localhost:3000/api-docs

Inclui:

Descrição de todos os endpoints

Exemplos de request e response

Status HTTP esperados



---

📚 Requisitos Atendidos

Requisito	Atendido

API RESTful Express	✔️
CRUD completo	✔️
Controllers + Models	✔️
Banco MongoDB	✔️
Autenticação JWT	✔️
Validações	✔️
Boas práticas REST	✔️
Testes unitários	✔️
Documentação (Swagger)	✔️
Repositório GitHub com README	✔️
Históricos de issues	✔️



---

🧑‍💻 Como contribuir

1. Criar branch:



git checkout -b feature/nome-da-feature

2. Fazer commit:



git commit -m "Descrição do commit"

3. Enviar:



git push origin feature/nome-da-feature

---

❤️ Obrigado por conferir este projeto!

Se tiver alguma dúvida, abra uma issue ou entre em contato com os autores.
