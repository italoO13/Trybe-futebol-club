import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import MatchesModel from '../Repository/Matches/MatchesModel';
import Auth from '../helper/Auth';

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

  describe('/POST', () => {

    describe('Ao inserir uma nova partida', () => {
      describe('caso os times sejam diferentes e existam', () => {
        beforeEach(() => {
          sinon.stub(Auth.prototype, 'veriryToken').resolves({
            id:1,
            role: 'admin',
          })
          sinon.stub(MatchesModel.prototype,'create').resolves({...mock.newMatch, id:1})
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

    })

  })

  describe('/PATCH', () => {
    describe('ao atualizar uma partida para false', () => {
      beforeEach(() => {
        sinon.stub(Auth.prototype, 'veriryToken').resolves({
          id:1,
          role: 'admin',
        })
        sinon.stub(MatchesModel.prototype,'updatedProgress').resolves()
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

  })

});