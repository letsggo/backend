import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import sequelize from './database.js';
import voteRouter from './routes/vote.js';
import candidateRouter from './routes/CreateCan.js';
import './models/associations.js'; // 관계 설정을 임포트

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('port', process.env.PORT || 3001);

sequelize.sync({ force: true })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.log(err);
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "index.html")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/vote", voteRouter);
app.use("/candidate", candidateRouter); // 후보 생성 라우트 사용

    // 404 에러 처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV !== 'production' ? err : {}
    });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
