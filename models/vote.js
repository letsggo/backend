import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Candidate from './Candidates.js';
// import User from './user.js';

const Vote = sequelize.define('Vote', {
  vote_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  candidate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidate,
      key: 'can_id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  skip: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  freezeTableName: true,
  timestamps: false  // createdAt 및 updatedAt 필드 자동 생성 안함
});

export default Vote;