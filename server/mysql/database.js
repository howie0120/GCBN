const mysql = require('mysql');

const dbConfig = {
    host: 'sql12.freemysqlhosting.net',     // MySQL 服务器的主机名
    user: 'sql12651271', // 您的 MySQL 用户名
    password: 'AXjfGGKwws', // 您的 MySQL 密码
    database: 'sql12651271' // 您的数据库名称
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
