const express = require('express');
const bodyParser = require('body-parser');
const userApi = require('./api/userApi');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// 啟動服務器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});