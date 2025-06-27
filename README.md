# ProjectPix

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="80" alt="NestJS" />
</p>

<p align="center">
  <b>API robusta para autenticação, gestão de usuários e geração de QR Code Pix.</b><br/>
  <i>Desenvolvido com NestJS, Prisma, JWT e muito mais!</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-Framework-red" />
  <img src="https://img.shields.io/badge/Prisma-ORM-blue" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black" />
</p>

---

## 📋 Sumário
- [Funcionalidades](#funcionalidades)
- [Tabela de Endpoints](#tabela-de-endpoints)
- [Exemplos de Uso](#exemplos-de-uso)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Tecnologias](#tecnologias)
- [Licença](#licença)

---

## 🚀 Funcionalidades
- **Autenticação JWT** (login, registro, recuperação de senha)
- **Gestão de usuários** (CRUD completo, roles, upload de foto)
- **Geração de QR Code Pix** (copia-e-cola e imagem base64)
- **Proteção de rotas por perfil** (admin, user)
- **Validação de ID e logging de requisições**
- **Rate limiting e CORS configurado**
- **Pronto para deploy na Vercel**

---

## 📚 Tabela de Endpoints

| Método | Rota                | Descrição                        | Proteção         |
|--------|---------------------|----------------------------------|------------------|
| POST   | /auth/register      | Cadastro de usuário              | Pública          |
| POST   | /auth/login         | Login e geração de token JWT     | Pública          |
| POST   | /auth/forget        | Solicitar recuperação de senha   | Pública          |
| POST   | /auth/reset         | Redefinir senha                  | Pública          |
| POST   | /auth/photo         | Upload de foto de perfil         | Autenticado      |
| POST   | /users/register     | Cadastro de usuário              | Pública          |
| GET    | /users              | Listar usuários                  | Admin            |
| GET    | /users/:id          | Detalhar usuário                 | Autenticado      |
| PUT    | /users/:id          | Atualizar usuário (total)        | Autenticado      |
| PATCH  | /users/:id          | Atualizar usuário (parcial)      | Autenticado      |
| DELETE | /users/:id          | Remover usuário                  | Autenticado      |
| POST   | /pix/gerar          | Gerar QR Code Pix                | Pública          |

---

## 💡 Exemplos de Uso

### Cadastro de Usuário
```http
POST /auth/register
Content-Type: application/json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "SenhaForte123!"
}
```

### Geração de QR Code Pix
```http
POST /pix/gerar
Content-Type: application/json
{
  "chavePix": "chave@pix.com",
  "valor": 100.50,
  "descricao": "Pagamento serviço"
}
```

---

## 🛠️ Como rodar o projeto

```bash
# Instale as dependências
npm install

# Gere o Prisma Client
npx prisma generate

# Rode em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 🧰 Tecnologias
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
- [Vercel](https://vercel.com/)
- [Pix-utils](https://www.npmjs.com/package/pix-utils)

---
---

<p align="center">
  <i>Desenvolvido por Matheus Carvalho</i>
</p>
