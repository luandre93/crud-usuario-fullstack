# CRUD - Gerenciamento de Usuários

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![JAVASCRIPT](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![VUEJS](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08)![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![SEQUELUZE](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)![MYSQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

------------

* [Demonstração](#demonstração)
* [Modelo Relacional no Banco de Dados](#modelo-relacional-no-banco-de-dados)
* [Iniciando Projeto](#iniciando-projeto)
    - [Instalação Dependências](#instalando-dependências)
        - [Backend-Node](#backend-node)
        - [Frontend-Vue](#frontend-vue)
    - [Rodando Servidor Local](#rodando-servidor-local)
        - [Backend-Node](#backend-node-1)
        - [Frontend-Vue](#frontend-vue-1)
* [Configuração do Banco na aplicação](#configuração-do-banco-na-aplicação)
    - [backend-node/src/database/db.config.ts](#backend-nodesrcdatabasedbconfigts)
* [Arquivo SQL Importando pelo DBeaver](#arquivo-sql-importando-pelo-dbeaver)
------------

## Demonstração
![](https://github.com/luandre93/crud-usuario-fullstack/blob/master/docs/crud-demonstracao.gif?raw=true)

## Modelo Relacional no Banco de Dados
![](https://github.com/luandre93/crud-usuario-fullstack/blob/master/docs/ModeloER.jpg?raw=true)

## Iniciando Projeto

####  Instalando Dependências
##### Backend-Node
* cd /backend-node/
* npm install

##### Frontend-Vue
* cd /frontend-vue/
* npm install

#### Rodando Servidor Local
##### Backend-Node
* cd /backend-node/
* npm start

Obs: Inicialização na porta 3000

##### Frontend-Vue
* cd /frontend-vue/
* npm run dev

Obs: Inicialização na porta 8080

## Configuração do Banco na aplicação

Para alteração de parametros do banco de dados altera as linhas no arquivo abaixo:

#### backend-node/src/database/db.config.ts
```
const dbName = process.env.DB_NAME as string || 'crud';  		// Nome do Banco de Dados.
const dbUser = process.env.DB_USER as string || 'root';     	// Nome do Usuário.
const dbHost = process.env.DB_HOST || 'localhost';         		// Host aonde se localiza o banco geralmente localhost
const dbDriver = process.env.DB_DRIVER as Dialect || 'mysql';   // Qual SGBD você quer conectar.
const dbPassword = process.env.DB_PASS || "" ; 				    // Senha do do usuario.
```
## Arquivo SQL Importando pelo DBeaver

Na pasta ***database-mysql*** se encontra um arquvio chamado ***mysql-crud.sql*** esse arquivo que iremos importar no DBeaver.
- Abra o DBeaver e crie um banco de dados chamado crud.
- Com botão direito em crud va até **"Tools -> Restore Database"**, logo em seguida se abrirá uma janela pedido o caminho do arquivo que iremos importar.
- Logo importado toda a estrutura está construida no Banco de Dados.