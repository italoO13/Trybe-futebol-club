import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import LeaderBoardsModel from '../Repository/LeaderBoard/LeaderModel';
import Auth from '../helper/Auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de LeaderBoards', () => {

  describe('/GET', () => {    
    beforeEach(() => {
      sinon.stub(LeaderBoardsModel.prototype,'getAllHome').resolves(mock.leaderBoards)
    })

    afterEach(()=>{
      sinon.restore()
    })

    it('Deve retornar um array com as clasificações dos times em casa', async() => {
      const result = await chai.request(app).get('/leaderboard/home');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.leaderBoards);
    });

  })

  
});