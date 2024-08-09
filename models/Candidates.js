import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Location from './Location.js';

const Candidate = sequelize.define('Candidate', {
  can_id: {
    type: DataTypes.INTEGER,
    // autoIncrement: true,
    primaryKey: true
  },
  can_name: {
    type: DataTypes.STRING,
    allowNull: false // can_name은 필수 필드로 설정
  },
  location_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Location,
      key: 'id'
    }
  },
  travel_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Travel', // 임시로 문자열로 지정. 실제 모델에서 수정 필요.
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // 임시로 문자열로 지정. 실제 모델에서 수정 필요.
      key: 'id'
    }
  },
  list_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'List', // 임시로 문자열로 지정. 실제 모델에서 수정 필요.
      key: 'id'
    }
  }
}, {
  timestamps: false // createdAt 및 updatedAt 필드 자동 생성 안함
});

export default Candidate;
