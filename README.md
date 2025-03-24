#  Blogger

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Frontend:** React + Styled Components
- **Backend:** Node.js + Fastify + Drizzle ORM + PostgreSQL + Docker
- **Autenticação:** JWT para login de usuário e persistência de login

## 📂 Estrutura do Projeto

```
/blogger
│── client/  # Aplicação React + Styled Components
│── server   # API Node + Fastify + Drizzle ORM + PostgreSQL + Docker
│── README.md  # Documentação Principal
```

## 🔐 Autenticação

O sistema conta com um mecanismo de autenticação baseado em JWT (JSON Web Token). O login do usuário será persistido para manter a sessão ativa mesmo após o fechamento da aplicação. 

- Os usuários poderão se autenticar via e-mail e senha.
- O token JWT será armazenado de forma segura no frontend.
- Endpoints protegidos exigirão um token válido para acesso.
- O token tem um limite máximo de validade de 1 hora.
- As senhas dos usuários são encriptadas utilizando bcrypt para maior segurança.

## 🛠️ Instalação e Configuração

### 1️⃣ Clonar o Repositório

```sh
git clone https://github.com/Joao123433/blogger.git
cd blogger
yarn
```

### 2️⃣ Configurar o Frontend

```sh
cd client
yarn  # Instala todas as dependencias
yarn dev
```

Acesse a aplicação em `http://localhost:5173`.

### 3️⃣ Configurar o Backend

```sh
cd server
yarn  # Instala todas as dependências
cp .env.example .env  # Configurar variáveis de ambiente
docker-compose up -d  # Inicializar o banco de dados
yarn drizzle-kit generate  # Gerar migrações do banco
yarn drizzle-kit migrate  # Aplicar migrações
yarn seed  # Popular o banco de dados
yarn dev  # Iniciar o servidor
```

A API estará disponível em `http://localhost:3000`. 

