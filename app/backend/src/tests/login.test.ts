import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import { Response } from 'superagent';
import IUserModel from '../model/ IUserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de Login', () => {

  let chaiHttpResponse: Response;
  let userModel:IUserModel;

  before(async () => {
    userModel= {
      findOne: sinon
      .stub()
      .resolves(mock.user)
    }
  });

  after(()=>{
    (userModel.findOne as sinon.SinonStub).restore();
  })

  describe('/POST', () => {
    it('Deve logar um usuário com sucesso', async() => {
      const result = await chai.request(app).post('/login').send(mock.loginSucess);
      expect(result.status).to.equal(201);
      expect(result.body).to.be.property('token');
    });


  })

});
