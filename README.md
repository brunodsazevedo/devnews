<h1 align="center">
  <img alt="DevNews" height="280" title="DevNews" src=".github/images/logo.png" />
</h1>

## 💻 Projeto

A DevNews Api é uma aplicação que possui integração com o serviço <a href="https://newsapi.org">News API</a>, e nossa API tem o intuito de trazer notícias do mundo inteiro focado em seus assuntos preferidos em tecnologia. Você poderá ver as principais noticias em destaque, e poderá ver noticias que são de seu interesse, como noticias sobre Machine Learning, novidades de novas featuares da linguagem NodeJS, entre outros assuntos.

## ✨ Tecnologias

- [x] NodeJS
- [x] Typescript
- [x] ExpressJS
- [x] TypeORM
- [x] ApiNews
- [x] JWT

## 📄 Pré-requisitos

- [x] NodeJS >= 14.0
- [x] yarn

## Executando o projeto

Antes de executar o projeto, certifique-se de que o arquivo **.env** esteja criado em seu ambiente. Para facilitar, há um arquivo **.env.examples** para saber quais variáveis de ambiente o projeto precisa para rodar corretamente.
<br>
<br>

Instale as dependências com o comando **yarn** em seu terminal.
```cl
yarn
```
Com as variáveis de ambiente configuradas, execute as migrations para crias as tabelas no banco de dados com o comando:
```cl
yarn typeorm migration:run -d src/database/index.ts 
```
Para iniciar a aplicação, basta executar:
```cl
yarn dev
```
Em seu terminal, será possível visualizar um log de que seu servidor está executando com sucesso.
```cl
Server is running at https://localhost:3333
```
## Rotas da aplicação

Para ver mais detalhes sobre as rotas da aplicação, acesse a documentação do swagger na rota <a href="http://localhost:3333/api-docs">https://localhost:3333/api-docs</a> ou em <a href="https://devnews.dotazevedo.com.br/api-docs">https://devnews.dotazevedo.com.br/api-docs</a>
