import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';
import TravelPlan from './travelPlan.js';
import TravelRoute from './travelRoute.js';

const Route = sequelize.define('Route', {
  way_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  travel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TravelPlan, // 외래키: TravelPlan의 travel_id
      key: 'travel_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  route_title: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: TravelRoute, // 외래키: TravelRoute의 route_title
      key: 'route_title'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: true, // 목적지 정보는 없을 수도 있음
  },
  search_url: {
    type: DataTypes.TEXT,
    allowNull: true // 길찾기 URL을 저장하는 필드
  }
}, {
  tableName: 'Route',
  timestamps: false,
  underscored: true
});

// 모델 간의 관계 설정
TravelPlan.hasMany(Route, { foreignKey: 'travel_id' });
Route.belongsTo(TravelPlan, { foreignKey: 'travel_id' });

TravelRoute.hasMany(Route, { foreignKey: 'route_title', sourceKey: 'route_title' });
Route.belongsTo(TravelRoute, { foreignKey: 'route_title', targetKey: 'route_title' });

export default Route;
