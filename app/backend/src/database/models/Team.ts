import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id?: number;
  team_name!: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  team_name: {
    type:STRING,
    allowNull:false
  }

}, {
  underscored: false,
  sequelize: db,
  tableName:'teams',
  timestamps: false,
});

export default Team;
