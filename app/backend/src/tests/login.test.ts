import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import { Response } from 'superagent';
import ILoginModel from '../Repository/ILoginModel';

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
      loginModel= {
        findOne: sinon
        .stub()
        .resolves(mock.user)
      }
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

  })

});