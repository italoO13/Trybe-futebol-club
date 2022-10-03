import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id?: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  homeTeam: {
    type:INTEGER,
    allowNull:false,
    references: {
      model: 'teams',
      key:'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  homeTeamGoals: {
    type:INTEGER,
    allowNull:false
  },
  awayTeam: {
    type:INTEGER,
    allowNull:false,
    references: {
      model: 'teams',
      key:'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  awayTeamGoals: {
    type:INTEGER,
    allowNull:false
  },
  inProgress: {
    type:BOOLEAN,
    allowNull:false
  },

}, {
  underscored: true,
  sequelize: db,
  tableName:'matches',
  timestamps: false,
});

Match.belongsTo(Team, {foreignKey:'homeTeam', as: 'teamhome'});
Match.belongsTo(Team, {foreignKey:'awayTeam', as: 'teamAway'});
Team.hasMany(Match, {foreignKey:'homeTeam', as: 'homeTeamMatches'});
Team.hasMany(Match, {foreignKey:'awayTeam', as: 'teamAwayMatches'} )

export default Match;
