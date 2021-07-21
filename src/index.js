//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');

//middleware koa para corpo das requisições
const koaBody = require('koa-body');

//importação das routas
const userRouter = require('./routes');

//cria conexão com o banco de dados
require('./database');

const koa = new Koa();

koa
  .use(koaBody())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
;

const server = koa.listen(PORT);

module.exports = server;