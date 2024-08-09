import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import MPLM from './MyPlaceListMapping.js';


const Location = sequelize.define('Location', {
  location_id: {
    type: DataTypes.INTEGER,
        primaryKey: true
  },
  travel_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  location_name: {
    type: DataTypes.STRING,
  },
  location_adress: {
    type: DataTypes.STRING,
  },
  list_id: {
    type: DataTypes.INTEGER,
    references: {
        autoIncrement: true,
    }
} 
}
, {
  freezeTableName: true,// 테이블 이름을 고정
  timestamps: false
}
);


export default Location;
