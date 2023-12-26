const express = require('express');
const bodyParser = require('body-parser');
const userApi = require('./api/userApi');
const cors = require('cors');
const http = require('http');

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);

app.use(cors({
    origin: '*', // 允许任何来源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的方法
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: false })); // 解析 application/x-www-form-urlencoded

// 設置跨域需求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 後端api路由
app.use('/api', userApi);

// server掛載在port上進行監聽
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});