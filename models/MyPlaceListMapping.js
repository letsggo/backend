import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const MyPlaceListMapping = sequelize.define('MyPlaceListMapping', {
  list_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mapping_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  place_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default MyPlaceListMapping;
