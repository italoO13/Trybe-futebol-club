import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha'
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
  
    before(async () => {
      loginModel= {
        findOne: sinon
        .stub()
        .resolves(mock.user)
      }
    });
  
    after(()=>{
      (loginModel.findOne as sinon.SinonStub).restore();
    })

    it('Deve logar um usuário com sucesso', async() => {
      const result = await chai.request(app).post('/login').send(mock.loginSucess);
      expect(result.status).to.equal(201);
      expect(result.body).to.be.property('token');
    });


  })

});