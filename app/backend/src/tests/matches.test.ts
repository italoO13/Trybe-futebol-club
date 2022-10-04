import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import MatchesModel from '../Repository/Matches/MatchesModel';
import Auth from '../helper/Auth';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de Matches', () => {

  describe('/GET', () => {    
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(mock.matches as unknown as Match[])
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

  describe('/POST', () => {

    describe('Ao inserir uma nova partida', () => {
      describe('caso os times sejam diferentes e existam', () => {
        beforeEach(() => {
          sinon.stub(Auth.prototype, 'veriryToken').resolves({
            id:1,
            role: 'admin',
          })
          sinon.stub(Match, 'create').resolves({...mock.newMatch, id:1} as unknown as Match)
        })
    
        afterEach(()=>{
          sinon.restore()
        })

        it('Deve retornar um status 201 e um objeto igual a interface IMatch', async() => {
          const result = await chai.request(app).post('/matches').send(mock.newMatch)
          .set('authorization', mock.token);
          expect(result.status).to.equal(201);
          expect(result.body).to.deep.equal({...mock.newMatch, id:1});
        })

      })
      describe('caso os times sejam iguais', () => {
        beforeEach(() => {
          sinon.stub(Auth.prototype, 'veriryToken').resolves({
            id:1,
            role: 'admin',
          })
          sinon.stub(MatchesModel.prototype,'matchById').resolves({...mock.newMatch, id:1, homeTeam:1, awayTeam:1})
        })
    
        afterEach(()=>{
          sinon.restore()
        })

        it('Deve retornar um status 401 e um erro com a menssagem It is not possible to create a match with two equal teams', async() => {
          const result = await chai.request(app).post('/matches').send({...mock.newMatch, id:1, homeTeam:1, awayTeam:1})
          .set('authorization', mock.token);
          expect(result.status).to.equal(401);
          expect(result.body).to.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
        })

      })
      describe('caso os times não existam', () => {
        beforeEach(() => {
          sinon.stub(Auth.prototype, 'veriryToken').resolves({
            id:1,
            role: 'admin',
          })
          sinon.stub(MatchesModel.prototype,'matchById').resolves()
        })
    
        afterEach(()=>{
          sinon.restore()
        })

        it('Deve retornar um status 401 e um erro com a menssagem It is not possible to create a match with two equal teams', async() => {
          const result = await chai.request(app).post('/matches').send({...mock.newMatch, id:1, homeTeam:999, awayTeam:999})
          .set('authorization', mock.token);
          expect(result.status).to.equal(404);
          expect(result.body).to.deep.equal({ "message": "There is no team with such id!" });
        })

      })
    })

  })

  describe('/PATCH', () => {
    describe('ao atualizar uma partida para false', () => {
      beforeEach(() => {
        sinon.stub(Auth.prototype, 'veriryToken').resolves({
          id:1,
          role: 'admin',
        })
        sinon.stub(Match, 'update').resolves()
      })
  
      afterEach(()=>{
        sinon.restore()
      })

      it('Deve retornar um status 200 e um objeto igual a interface IMatch', async() => {
        const result = await chai.request(app).patch('/matches/1/finish').send(mock.newMatch)
        .set('authorization', mock.token);
        expect(result.status).to.equal(200);
        expect(result.body).to.deep.equal({ "message": "Finished" });
      })

    })


    describe('ao tentar atualizar o placar de uma partida em andamento', () => {

      beforeEach(() => {
        sinon.stub(Auth.prototype, 'veriryToken').resolves({
          id:1,
          role: 'admin',
        })
      })
  
      afterEach(()=>{
        sinon.restore()
      })



      it('é possível alterar o resultado de uma partida', async() => {
        sinon.stub(MatchesModel.prototype,'updatedGoals').resolves(mock.matches[0])

        const result = await chai.request(app).patch('/matches/1').send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }).set('authorization', mock.token);
        expect(result.status).to.equal(200);
        expect(result.body).to.deep.equal(mock.matches[0]);
      })

      it('Caso aconteça um erro deve retornar uma excessão com a mensagem Error trying to update match', async () => {
        sinon.stub(MatchesModel.prototype,'updatedGoals').resolves()

        const result = await chai.request(app).patch('/matches/1').send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }).set('authorization', mock.token);
        expect(result.status).to.equal(404);
        expect(result.body).to.deep.equal({message: 'Error trying to update match'});

      })

    })

  })

});