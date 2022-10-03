import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matcher extends Model {
  id?: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals: string;
  inProgress: boolean;
}

Matcher.init({
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

Matcher.belongsTo(Team, {foreignKey:'homeTeam', as: 'teamhome'});
Matcher.belongsTo(Team, {foreignKey:'awayTeam', as: 'awayhome'});
Team.hasMany(Matcher, {foreignKey:'homeTeam', as: 'homeTeamMatches'});

export default Matcher;
