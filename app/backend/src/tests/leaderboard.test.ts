import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import LeaderBoardsModel from '../Repository/LeaderBoard/LeaderModel';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import HelperBoard from '../helper/Leaderboards';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de LeaderBoards', () => {

  describe('/GET', () => {    
    beforeEach(() => {
      sinon.stub(Match,'findAll').resolves()
      sinon.stub(Team,'findAll').resolves()
      sinon.stub(HelperBoard.prototype, 'getAll').resolves(mock.leaderBoards);
      sinon.stub(HelperBoard.prototype, 'getAway').resolves(mock.leaderBoards);
      sinon.stub(HelperBoard.prototype, 'getHome').resolves(mock.leaderBoards);
    })

    afterEach(()=>{
      sinon.restore()
    })

    it('Deve retornar um array com as clasificações dos times em casa', async() => {
      const result = await chai.request(app).get('/leaderboard/home');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.leaderBoards);
    });
    it('Deve retornar um array com as clasificações dos times de fora', async() => {
      const result = await chai.request(app).get('/leaderboard/away');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.leaderBoards);
    });
    it('Deve retornar um array com as clasificações de todos os times em casa e fora', async() => {
      const result = await chai.request(app).get('/leaderboard');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.leaderBoards);
    });


  })

  
});