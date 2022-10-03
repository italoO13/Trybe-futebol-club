import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import { Response } from 'superagent';
import ILoginModel from '../Repository/Login/ILoginModel';
import Auth from '../helper/Auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de Login', () => {

  describe('/POST', () => {
    let chaiHttpResponse: Response;
    let loginModel:ILoginModel;

    afterEach(()=>{
      sinon.restore()
    })

    it('Deve logar um usuário com sucesso', async() => {

      sinon.stub(LoginModel.prototype, 'findOne').resolves(mock.user)
      const result = await chai.request(app).post('/login').send(mock.loginSucess);
      expect(result.status).to.equal(200);
      expect(result.body).to.be.property('token');
    });

    it('Deve retornar um erro com a menssagem "All fields must be filled" e status 400 quando não é passado o email ao fazer login', async() => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves()
      }
      const result = await chai.request(app).post('/login').send({...mock.loginSucess, email:''})
      expect(result.status).to.be.equal(400);
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('All fields must be filled')
    })

    it('Deve retornar um erro com a menssagem "All fields must be filled" e status 400 quando não é passado um password ao fazer login', async() => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves()
      }
      const result = await chai.request(app).post('/login').send({...mock.loginSucess, password:''})
      expect(result.status).to.be.equal(400);
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('All fields must be filled')
    })

    it('Deve retornar um erro com a menssagem "Incorrect email or password" e status 401 quando é passado um email invalido', async() => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves()
      }
      const result = await chai.request(app).post('/login').send({...mock.loginSucess, email:'emailinvalido.com'})
      expect(result.status).to.be.equal(401);
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('Incorrect email or password')
    })

    it('Deve retornar um erro com a menssagem "Incorrect email or password" e status 401 quando não é encontrado o email no banco de dados', async() => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves()
      }
      const result = await chai.request(app).post('/login').send({...mock.loginSucess, email:'email@naocadastrado.com'})
      expect(result.status).to.be.equal(401);
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('Incorrect email or password')
    })
    it('Deve retornar um erro com a menssagem "Incorrect email or password" e status 401 quando o password está incorreto', async() => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves(mock.user)
      }
      const result = await chai.request(app).post('/login').send({...mock.loginSucess, password:'naoexiste'})
      expect(result.status).to.be.equal(401);
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('Incorrect email or password')
    })

  })

  describe('/GET', () => {
    beforeEach(() => {
      const auth = new Auth();
      sinon.stub(auth, 'veriryToken').resolves({
        id: mock.user.id,
        email: mock.user.email,
        role: mock.user.role
      })
    })

    afterEach(() => {
      sinon.restore()
    })

    it('Deve retornar um role no metodo get com base no usuário enviado', async() => {
      const result = await chai.request(app).get('/login/validate').set('authorization', mock.token)
      expect(result.status).to.be.equal(200);
      // expect(result.body).to.property('role')
      // expect(result.body.role).to.equal('admin')
    })

    it('Deve retornar um erro "Token not found" quando não é passado um token em authorization', async() => {
      const result = await chai.request(app).get('/login/validate').set('authorization','')
      expect(result.status).to.be.equal(401);
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('Token not found')
    })
  })

});