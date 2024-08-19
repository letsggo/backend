import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';
import TravelPlan from './travelPlan.js';
import TravelRoute from './travelRoute.js';

const Route = sequelize.define('Route', {
  route_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  travel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TravelPlan,
      key: 'travel_id'
    }
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  search_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Route',
  timestamps: false,
  underscored: true,
});

// 모델 간의 관계를 설정합니다.
TravelPlan.hasMany(Route, { foreignKey: 'travel_id' });
Route.belongsTo(TravelPlan, { foreignKey: 'travel_id' });

export default Route;
