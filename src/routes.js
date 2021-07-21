//importação do Router
const Router = require('koa-router');

//instanciação do Router
var userRouter = new Router();

//importação do controller de usuário
var UserController = require('./controllers/UserController');

const PORT = process.env.PORT || 3000;

//Rota principal da aplicação
userRouter.get('/', async (ctx) => {
   ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Rota para listar todos os usuários cadastrados
userRouter.get('/users', UserController.list);

//Rota para cadastrar um novo usuário
userRouter.post('/user', UserController.store);


//Rota para encontrar um usuário específico
userRouter.get('/user/:name', UserController.find);

//Rota para deletar um usuário específico
userRouter.delete('/user/:name', UserController.deleteUser);


//Rota para alterar um usuário específico
userRouter.patch('/user/:name/:newname', UserController.alterUser);

module.exports = userRouter;