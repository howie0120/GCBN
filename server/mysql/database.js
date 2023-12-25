const mysql = require('mysql');

class DBHelper{
    // 資料庫連接
    getConn(){
        let conn = mysql.createConnection({
            // 資料庫配置
            host:'sql12.freemysqlhosting.net',
            port:'3306',
            user:'sql12672704',
            password:'p1zStN9cLh',
            database:'sql12672704'
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBHelper;