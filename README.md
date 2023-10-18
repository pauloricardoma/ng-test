# NG.CASH - FullStack (Deprecated / Faria diferente atualmente :D)

### Desafio:

Estruturar uma aplicação web *fullstack*, ***dockerizada***, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si. 

### Considerações pessoais:

O backend foi desenvolvido com Node.Js, Express, Typescript, Prisma, Postgresql, autenticação JWT e testes com Jest. O frontend foi desenvolvido com React.Js, create-react-app, Typescript, redux, redux-saga, axios, router-dom, styled-components, hook-form, yup. De acordo como foi pedido, foi dockerizada a aplicação.

### Pré-requisitos:

Tenha instalado em sua máquina as seguintes ferramentas:
Docker / docker-compose / Node.js

### Rodando a aplicação

1. Extrair os arquivos.

2. Tenha certeza das portas não estarem sendo usadar:
- frontend rodando em: http://localhost:3000
- backend rodando em: http://localhost:4000
- postgresql rodando na porta: 5432

3. Entre no projeto e execute o docker-compose
```bash
# Instalar as dependências
$ docker-compose up --build

```
<h4>🛠 Tecnologias</h4>

As seguintes ferramentas foram usadas na construção do projeto:

NODEJS / TYPESCRIPT / REACT / EXPRESS / POSTGRESQL / EXPRESS
