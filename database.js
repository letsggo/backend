// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   logging: false
// });

// const createDatabase = async () => {
//   try {
//     // 기본 연결
//     const tempSequelize = new Sequelize({
//       host: process.env.DB_HOST,
//       dialect: process.env.DB_DIALECT,
//       username: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       logging: false
//     });

//     // 데이터베이스 생성
//     await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
//     console.log(`데이터베이스 ${process.env.DB_NAME}가 생성되었습니다.`);
//   } catch (error) {
//     console.error('데이터베이스 생성 오류:', error);
//   }
// };

// export default sequelize; // default로 내보내기

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import configFile from './config/config.json' assert { type: 'json' }; // JSON 모듈 가져오기

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = configFile[env]; // 환경 설정을 가져옵니다.

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

export default sequelize; // default로 내보내기
