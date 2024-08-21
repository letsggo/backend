import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';
import TravelPlan from './travelPlan.js';
import TravelRoute from './travelRoute.js';

const Route = sequelize.define('Route', {
  travel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TravelPlan,
      key: 'travel_id'
    },
    onDelete: 'CASCADE',
  },
  route_title: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: TravelRoute,
      key: 'route_title'
    },
    onDelete: 'CASCADE',
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: TravelRoute,
      key: 'place_name'
    },
    onDelete: 'CASCADE',
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: TravelRoute,
      key: 'place_name'
    },
    onDelete: 'CASCADE',
  },
  search_url: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Route',
  timestamps: false,
  underscored: true,
});

// 모델 간의 관계를 설정합니다.
TravelPlan.hasMany(Route, { foreignKey: 'travel_id' });
Route.belongsTo(TravelPlan, { foreignKey: 'travel_id' });

TravelRoute.hasMany(Route, { foreignKey: 'route_title', sourceKey: 'route_title' });
Route.belongsTo(TravelRoute, { foreignKey: 'route_title', targetKey: 'route_title' });

TravelRoute.hasMany(Route, { foreignKey: 'start_location', sourceKey: 'place_name' });
Route.belongsTo(TravelRoute, { foreignKey: 'start_location', targetKey: 'place_name' });

TravelRoute.hasMany(Route, { foreignKey: 'end_location', sourceKey: 'place_name' });
Route.belongsTo(TravelRoute, { foreignKey: 'end_location', targetKey: 'place_name' });

export default Route;
