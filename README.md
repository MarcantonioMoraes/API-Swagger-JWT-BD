# 📚 API de Gestão de Alunos - Express + TypeScript

Uma API REST robusta para gerenciamento de alunos com autenticação JWT, documentação Swagger e integração com banco de dados PostgreSQL usando TypeORM.

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Login seguro com tokens JWT
- 📋 **CRUD de Alunos** - Criar, ler, atualizar e deletar alunos
- 📖 **Documentação Swagger** - API documentada automaticamente
- 🗄️ **TypeORM** - ORM para TypeScript com suporte a PostgreSQL
- 🔒 **Middleware de Autenticação** - Proteção de rotas
- 🌐 **CORS Habilitado** - Suporte para requisições cross-origin
- 📦 **TypeScript** - Tipagem estática e segurança de tipos
- 🔄 **Hot Reload** - Desenvolvimento com recarregamento automático

---

## 📋 Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- PostgreSQL 12 ou superior
- Git

---

## 🚀 Como Usar

    ### 1️⃣ Instalação

```bash
npm install
```

### 2️⃣ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL=postgresql://usuario:senha@localhost:5432/api_faculdade

# JWT
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=24h

# Server
PORT=3000
NODE_ENV=development
```

### 3️⃣ Configurar Banco de Dados

```bash
# Executar migrações (se houver)
npx typeorm migration:run -d dist/database/data-source.js

# Sincronizar schema
npx typeorm schema:sync -d dist/database/data-source.js
```

### 4️⃣ Desenvolvimento (com hot reload)

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000` e recarregará automaticamente quando você fizer alterações.

### 5️⃣ Produção

Compilar TypeScript:
```bash
npm run build
```

Iniciar servidor:
```bash
npm run start
```

---

## 📁 Estrutura do Projeto

```
api-express-ts/
├── src/
│   ├── app.ts                    # Configuração do Express
│   ├── server.ts                 # Inicialização do servidor
│   ├── config/
│   │   └── swagger.ts            # Configuração do Swagger
│   ├── controllers/
│   │   ├── aluno.controller.ts   # Lógica de alunos
│   │   └── auth.controller.ts    # Lógica de autenticação
│   ├── database/
│   │   └── data-source.ts        # Configuração TypeORM
│   ├── entities/
│   │   ├── Alunos.ts            # Modelo de Alunos
│   │   └── User.ts              # Modelo de Usuário
│   ├── middlewares/
│   │   └── auth.middleware.ts    # Middleware de autenticação
│   ├── routes/
│   │   ├── aluno.routes.ts       # Rotas de alunos
│   │   └── auth.routes.ts        # Rotas de autenticação
│   └── @types/
│       └── express/
│           └── index.d.ts        # Type definitions customizadas
├── dist/                         # Código compilado (gerado)
├── .env                          # Variáveis de ambiente
├── package.json                  # Dependências do projeto
├── tsconfig.json                 # Configuração TypeScript
└── README.md                      # Este arquivo
```

---

## 🔌 Endpoints da API

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/login` | Login de usuário |
| `POST` | `/auth/register` | Registro de novo usuário |

### Alunos

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `GET` | `/alunos` | Listar todos os alunos | ✅ Requerida |
| `GET` | `/alunos/:id` | Obter aluno por ID | ✅ Requerida |
| `POST` | `/alunos` | Criar novo aluno | ✅ Requerida |
| `PUT` | `/alunos/:id` | Atualizar aluno | ✅ Requerida |
| `DELETE` | `/alunos/:id` | Deletar aluno | ✅ Requerida |

### Documentação

- **Swagger UI**: `GET /api-docs` - Documentação interativa da API

---

## 🔐 Autenticação JWT

A API utiliza tokens JWT para autenticação. 

### Fluxo de Autenticação

1. Faça login em `/auth/login` com credenciais válidas
2. Você receberá um token JWT
3. Inclua o token no header de autorização:
   ```
   Authorization: Bearer <seu_token_jwt>
   ```

### Middleware de Autenticação

Todas as rotas de alunos estão protegidas pelo middleware de autenticação. O token deve ser passado no header `Authorization`.

---

## 🏗️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Express.js** | Framework web |
| **TypeScript** | Linguagem com tipagem estática |
| **TypeORM** | ORM para banco de dados |
| **PostgreSQL** | Banco de dados relacional |
| **JWT (jsonwebtoken)** | Autenticação e autorização |
| **bcryptjs** | Hashing de senhas |
| **Swagger/OpenAPI** | Documentação da API |
| **CORS** | Compartilhamento de recursos entre origens |

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "@prisma/client": "^7.1.0",
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.5",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "pg": "^8.17.1",
    "typeorm": "^0.3.28",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^25.0.2",
    "ts-node-dev": "^2.0.0",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
  }
}
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Watch mode com tsx
npm run watch

# Compilação TypeScript
npm run build

# Iniciar servidor em produção
npm run start
```

---

## 🚨 Troubleshooting

### Erro de Conexão com Banco de Dados
- Verifique se PostgreSQL está rodando
- Confirme a `DATABASE_URL` no arquivo `.env`
- Verifique credenciais de banco de dados

### Token JWT Inválido
- Token expirou: Faça login novamente
- Token malformado: Verifique se está sendo enviado corretamente no header
- Secret não coincide: Verifique `JWT_SECRET` no `.env`

### Porta já em uso
- Mude a porta no arquivo `.env`
- Ou finalize o processo usando a porta: `lsof -i :3000`

---

## 👤 Autor

**Marcantonio Moraes**

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Última atualização:** 17 de janeiro de 2026
