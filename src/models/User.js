const { Model, DataTypes } = require('sequelize');

/*Define model de usuário, utilizei a classe 'Model'
* do sequelize para utilizar os métodos do orm
*/
class User extends Model {
   static init(sequelize) {
      super.init({
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         age: {
            type: DataTypes.INTEGER,
            minimum: 18,
         },   
      }, {
         sequelize
      });
   }
}

module.exports = User;