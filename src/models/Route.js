import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';
import TravelPlan from './travelPlan.js';
import TravelRoute from './travelRoute.js';

const Route = sequelize.define('Route', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
    allowNull: false,
    references: {
      model: TravelPlan,
      key: 'place_name'
    }
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: TravelPlan,
      key: 'place_name'
    }
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

TravelPlan.hasMany(Route, { foreignKey: 'start_location' });
Route.belongsTo(TravelPlan, { foreignKey: 'place_name' });

TravelPlan.hasMany(Route, { foreignKey: 'end_location' });
Route.belongsTo(TravelPlan, { foreignKey: 'place_name' });

export default Route;
