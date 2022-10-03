import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import MatchesModel from '../Repository/Matches/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de Matches', () => {

  describe('/GET', () => {    
    beforeEach(() => {
      sinon.stub(MatchesModel.prototype,'getAll').resolves(mock.matches)
    })

    afterEach(()=>{
      sinon.restore()
    })

    it('Deve retornar um array com todas as partidas jogadas', async() => {
      const result = await chai.request(app).get('/matches');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.matches);
    });

  })

});