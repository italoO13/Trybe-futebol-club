import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import TeamsModel from '../Repository/Teams/TeamsModel';
import ITeamsModel from '../Repository/Teams/ITeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de Teams', () => {

  describe('/GET', () => {
    let teamsModel:ITeamsModel ;
    
    beforeEach(() => {
      const model = new TeamsModel();
      sinon.stub(TeamsModel.prototype,'getAll').resolves(mock.teams)
    })

    afterEach(()=>{
      sinon.restore()
    })

    it('Deve retornar um array de teams com sucesso com status 200', async() => {
      const result = await chai.request(app).get('/teams');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.teams);
    });

  })
});