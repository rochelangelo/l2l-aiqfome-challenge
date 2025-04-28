# L2L Aiqfome Challenge – API de Clientes e Produtos Favoritos

API RESTful desenvolvida para o desafio técnico da L2L Aiqfome (Magazine Luiza).
Esta API permite o gerenciamento de clientes e da lissta dos produtos favoritos, produtos fornecido e integrados a uma API externa.

---

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Swagger (Documentação OpenAPI)
- Axios (requisições HTTP)

---

## Funcionalidades

- Registro de usuários
- Login com autenticação JWT
- CRUD de Clientes (Criar, Listar, Atualizar, Remover)
- Adicionar, listar e remover Produtos Favoritos
- Integração com API pública [Fake Store API](https://fakestoreapi.com/)
- Documentação da API via Swagger

---

## Autenticação

A API utiliza **JWT** para autenticação.
Após fazer o login (`/auth/login`), um token é gerado.
Este token deve ser enviado no **header Authorization** em todas as rotas protegidas:

---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando
- Git instalado

### Passos

1. Clonar o repositório:

```bash
git clone https://github.com/seu-usuario/l2l-aiqfome-challenge.git
```

2. Instalar as dependências:

```bash
npm install
```

3. Configurar o arquivo .env:

```ini
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco"
JWT_SECRET="suaChaveSecretaJWT"
PORT=3000
```

**Atenção:** _Altere os dados de conexão do seu banco, de acordo com a configuração local._

4. Execute as migrateions para criação do banco:

```bash
npx prisma migrate dev --name init
```

5. Inicie o servidor:

```bash
npm start
```

6. URL para acesso da documentação da API:
   - http://localhost:3000/api-docs

---

## Endpoints principais

### Autenticação

| Método | Rota             | Descrição                        |
| :----- | :--------------- | :------------------------------- |
| POST   | `/auth/register` | Registrar novo usuário           |
| POST   | `/auth/login`    | Realizar login e gerar token JWT |

### Clientes

| Método | Rota             | Descrição                       |
| :----- | :--------------- | :------------------------------ |
| POST   | `/clientes`      | Criar cliente                   |
| GET    | `/clientes`      | Listar todos os clientes        |
| GET    | `/clientes/{id}` | Buscar dados do cliente pelo ID |
| PUT    | `/clientes/{id}` | Atualizar cliente               |
| DELETE | `/clientes/{id}` | Deletar cliente                 |

### Favoritos

| Método | Rota                                          | Descrição                               |
| :----- | :-------------------------------------------- | :-------------------------------------- |
| POST   | `/clientes/{clienteId}/favoritos`             | Adicionar produto aos favoritos         |
| GET    | `/clientes/{clienteId}/favoritos`             | Listar produtos favoritados do cliente  |
| DELETE | `/clientes/{clienteId}/favoritos/{produtoId}` | Remover produto da lista de favoritados |

---

## Documentação Swagger

Acesse a documentação completa de todos os endpoints:
`http://localhost:3000/api-docs`

---

## Observações

- Integração de produtos favoritos validado via [Fake Store API](https://fakestoreapi.com/docs).
- Proteção de todas as rotas com token JWT.
- Boas práticas de organização de códgio (camadas: Controller, Services, Routes, Middlewares).
