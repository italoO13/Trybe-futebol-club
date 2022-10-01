import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id?: number;
  teamName!: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  teamName: {
    type:STRING,
    allowNull:false
  }

}, {
  underscored: true,
  sequelize: db,
  tableName:'teams',
  timestamps: false,
});

export default Team;
