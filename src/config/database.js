//Configuração do banco de dados SqLite
module.exports = {
   dialect: 'sqlite',
   storage: 'src/database/mydatabase',
   database: 'mydatabase',
   define : {
      timestamp: true,
      underscored: true,
   },
};