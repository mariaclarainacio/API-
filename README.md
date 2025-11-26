API RESTful – Parte 1
📘 Descrição do Projeto
A API implementa:

Autenticação com JWT

Registro e login de usuários

CRUD completo de produtos

Documentação com Swagger

Testes automatizados utilizando Jest e Supertest

📁 Estrutura de Pastas
src/
├─ app.js
├─ server.js
├─ config/
│  └─ db.js
├─ controllers/
│  ├─ authController.js
│  ├─ produtoController.js
├─ models/
│  ├─ User.js
│  └─ Produto.js
├─ routes/
│  ├─ authRouter.js
│  ├─ produtosRouter.js
│  └─ usuariosRouter.js
├─ middlewares/
│  ├─ authMiddleware.js
│  ├─ errorHandler.js
│  └─ validateMiddleware.js
├─ validators/
│  ├─ authValidators.js
│  └─ produtoValidators.js
└─ docs/
   └─ swagger.js
tests/
├─ auth.test.js
└─ produtos.test.js
.env.example

🛠️ Pré-requisitos

Node.js (versão 18 ou superior)

npm

Conta no MongoDB Atlas (ou instalação local)

Git

⚙️ Instalação do Projeto
1. Clonar o repositório
git clone https://github.com/mariaclarainacio/API-.git
cd API-

2. Instalar dependências
npm install

3. Criar o arquivo .env

Utilize como base o .env.example:

# Banco de produção
MONGODB_URI=mongodb+srv://MariaClara:MinhaSenha123@cluster0.h0c8te1.mongodb.net/api_db?retryWrites=true&w=majority&appName=Cluster0

# Banco de testes
MONGODB_URI_TEST=mongodb+srv://MariaClara:MinhaSenha123@cluster0.h0c8te1.mongodb.net/api_db_test?retryWrites=true&w=majority&appName=Cluster0

# Porta da aplicação
PORT=3000

# Segredo para geração de tokens JWT
JWT_SECRET=segredo123

🚀 Executando o Servidor
npm start


Servidor disponível em:

http://localhost:3000


Health Check:
GET / → retorna API funcionando! 🚀

📖 Documentação da API (Swagger)

A documentação completa da API pode ser acessada em:

http://localhost:3000/api-docs


O Swagger inclui:

Estrutura das requisições e respostas

Exemplo de uso de cada endpoint

Suporte a autenticação com JWT dentro da interface

🔑 Endpoints de Autenticação
Método	Rota	Descrição
POST	/api/auth/register	Registrar novo usuário
POST	/api/auth/login	Login e geração de token
🛍️ Endpoints de Produtos
Método	Rota	Descrição	Autenticação
GET	/api/produtos	Listar produtos	❌ Não
GET	/api/produtos/:id	Buscar produto por ID	❌ Não
POST	/api/produtos	Criar produto	✅ Sim
PUT	/api/produtos/:id	Atualizar produto	✅ Sim
DELETE	/api/produtos/:id	Remover produto	✅ Sim
🧪 Testes Automatizados

Para executar todos os testes:

npm test


Arquivos de testes:

auth.test.js → Testes de registro e login

produtos.test.js → Testes do CRUD de produtos (token JWT necessário)

O Jest utiliza o banco de dados definido na variável MONGODB_URI_TEST.

Para executar apenas os testes de produtos:

npx jest tests/produtos.test.js

🛡️ Autenticação com JWT

Para acessar rotas protegidas:

Realize login em POST /api/auth/login

Copie o token retornado

Insira no header:

Authorization: Bearer <token>


Ou, no Swagger, clique em Authorize.

📌 Observações Finais

Esta entrega corresponde exclusivamente à Parte 1 do trabalho.

Inclui autenticação, CRUD de produtos, validação, testes e documentação.

👥 Integrantes

Maria Clara Inácio Costa e Silva — Implementação completa do projeto (rotas, validações, controllers, Swagger, testes e documentação).

Matheus Augusto da Silva Gomes — Apoio teórico e revisão.