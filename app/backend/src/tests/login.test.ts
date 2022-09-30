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

  afterEach(()=>{
    sinon.restore()
  })

  describe('/POST', () => {
    let chaiHttpResponse: Response;
    let loginModel:ILoginModel;
  
    beforeEach(async () => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves(mock.user)
      }
    });
  

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


  })

});