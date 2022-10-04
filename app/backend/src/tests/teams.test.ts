import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';
import mock from './mock'
import TeamsModel from '../Repository/Teams/TeamsModel';
import ITeamsModel from '../Repository/Teams/ITeamsModel';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada  de Teams', () => {

  describe('/GET', () => {
    let teamsModel:ITeamsModel ;
    
    beforeEach(() => {
      const model = new TeamsModel();
      sinon.stub(Team, 'findAll').resolves(mock.teams as Team[])
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

  describe('/GET/:id', () =>{

    afterEach(()=>{
      sinon.restore()
    })

    it('Deve retornar o time "Avaí/Kindermann" quando passado o id 1', async() => {
      const model = new TeamsModel();
      sinon.stub(Team, 'findByPk').resolves(mock.teams[0] as Team)

      const result = await chai.request(app).get('/teams/1');
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(mock.teams[0]);
    })

    it('Deve retornar um erro ao passar um id que não existe', async() => {
      const model = new TeamsModel();
      sinon.stub(TeamsModel.prototype,'getById').resolves()

      const result = await chai.request(app).get('/teams/1');
      expect(result.status).to.equal(400);
      expect(result.body).property('message');
      expect(result.body.message).to.be.equal('Team not found')
    })


  })
});