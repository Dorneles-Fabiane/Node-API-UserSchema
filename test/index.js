//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');
const User = require('../src/models/User.js');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe('Um simples conjunto de testes', function () {
    it('deveria retornar -1 quando o valor não esta presente', function () {
        assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
});

//testes da aplicação
describe('Testes da aplicaçao',  () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.eql([]);
        done();
        });
    });

    it('deveria criar o usuario raupp', function (done) {
        let user = {
            name: "raupp", 
            email: "jose.raupp@devoz.com.br", 
            age: 35
        }
        chai.request(app)
        .post('/user')
        .send(user)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

    it('o usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
        .get('/user/naoExiste')
        .end(function (err, res) {
           // expect(err.response.body.error).to.be.equal(404); //possivelmente forma errada de verificar a mensagem de erro
            expect(res).to.have.status(404);
            expect(res.body).to.be.jsonSchema(User);
            done();
        });
    });

    it('o usuario raupp existe e é valido', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(User);
            done();
        });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(User);
            done();
        });
    });

    it('o usuario raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.jsonSchema(User);
            done();
        });
    });

    it('deveria criar usuária Fabiane', function(done) {
        const fabiane = {
            name: "Fabiane",
            email: "fabiane.mail.d@gmail.com",
            age: 25,
        };
        chai.request(app)
        .post('/user')
        .send(fabiane)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('deveria criar usuário Diuliam', function(done) {
        const diuliam = {
            name: "Diuliam",
            email: "diuliam@gmail.com",
            age: 31,
        };
        chai.request(app)
        .post('/user')
        .send(diuliam)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('deveria criar usuário Paula', function(done) {
        const paula = {
            name: "Paula",
            email: "paula@gmail.com",
            age: 32,
        };
        chai.request(app)
        .post('/user')
        .send(paula)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('deveria criar usuário Eduarda', function(done) {
        const eduarda = {
            name: "Eduarda",
            email: "eduarda@gmail.com",
            age: 52,
        };
        chai.request(app)
        .post('/user')
        .send(eduarda)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('deveria criar usuário Joana', function(done) {
        const joana = {
            name: "Joana",
            email: "joana@gmail.com",
            age: 15,
        };
        chai.request(app)
        .post('/user')
        .send(joana)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
    

    it('deveria ser uma lista com pelo menos 5 usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.at.least(5);
        done();
        });
    });

    it('deveria alterar o nome da usuária Fabiane para Maria', function (done) {
        chai.request(app)
        .patch('/user/Fabiane/Maria')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(User);
            done();
        });
    });
})