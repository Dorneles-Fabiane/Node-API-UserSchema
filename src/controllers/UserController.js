const User = require('../models/User');

module.exports = {
   //Lista todos os usuários cadastrados no banco
   async list(ctx) {
      const users = await User.findAll();

      return ctx.body = users;
   },

   /* Recebe os dados do novo usuário atraves do corpo da requisição e
   *  armezena no banco de dados.
   *  
   * Formato de dados esperado:
   *  {
   *     name: string, 
   *     email: string, 
   *     age: number, 
   *  }
   */ 
   async store(ctx) {
      ctx.body = ctx.request.body;
      
      const { name, email, age } = ctx.body;
      
      const user = await User.create({ name, email, age });
      
      return ctx.toJSON(user);
   },
   
   /* Recebe o nome a ser pesquisado atraves de params.
   *  Verifica se a busca retornou algo, caso não tenha
   *  retornado nada muda o status para 404 - NOT FOUND.
   */
   async find(ctx) {
      const userName = ctx.params.name;

      const user = await User.findAll({
         where: {
            name: userName,
         }
      });

      if (user.length == 0) {
         ctx.status = 404
         return ctx.body = "User not found!";
      }

      return ctx.body = user;
   },


   /* Recebe o nome a ser pesquisado atraves de params.
   *  Verifica se a busca retornou algo, caso não tenha
   *  retornado nada muda o status para 404 - NOT FOUND.
   *  Caso retorne o usuário deleta do banco de dados.
   */
   async deleteUser(ctx) {
      const userName = ctx.params.name;

      const user = await User.findAll({
         where: {
            name: userName,
         }
      });

      if(user.length != 0) {
         await User.destroy({
            where: {
               name: userName,
            }
         });

         ctx.status = 200;
         return ctx.body = "User successfully deleted";
      }

      ctx.status = 404;
      return ctx.body = "User not found";
   },

   /* Recebe o nome a ser alterado atraves de params.
   *  Recebe o novo nome atraves de params.
   *  Verifica se a busca retornou algo, caso não tenha
   *  retornado nada muda o status para 404 - NOT FOUND.
   *  Caso tenha retornada algo faz a alteração e 
   *  salva o novo nome no banco de dados.
   */
   async alterUser(ctx) {
      const userName = ctx.params.name;
      const newUserName = ctx.params.newname;

      const user = await User.findOne({
         where: {
            name: userName,
         }
      });

      if(user.length != 0) {
         user.name = newUserName;

         await user.save();

         ctx.status = 200;
         return ctx.body = "User successfully altered";
      }

      ctx.status = 404;
      return ctx.body = "User not found";
   }
}