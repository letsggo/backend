import { Sequelize } from 'sequelize';
import configFile from '../config/config.json' assert { type: 'json' }; // import assertion을 추가
const env = process.env.NODE_ENV || 'development';
const config = configFile[env]; // 환경 설정을 가져옵니다.
const db = {}; // 실제 데이터베이스가 이 db 객체와 연결됨

const sequelize = new Sequelize(config.database, config.username, config.password, config); 
// 데이터베이스와 연결하기, 시퀄라이즈 ORM 객체 생성

db.sequelize = sequelize; // 나중에 연결 객체 재사용을 위해 넣어둠, db객체에 sequelize라는 프로퍼티 추가
export default sequelize; // default export로 내보냅니다.