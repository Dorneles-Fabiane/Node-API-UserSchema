const Sequelize = require('sequelize');

//importa configuração do banco de dados
const dbConfig = require('../config/database');

//Importa model de usuário
const User = require('../models/User');

//instancia Sequelize e informa as configurações do banco de dados
const connection = new Sequelize(dbConfig);

//Inicia conexão com o banco de dados
User.init(connection);

module.export = connection;