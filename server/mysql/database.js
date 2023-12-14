const mysql = require('mysql');

class DBHelper{
    // 資料庫連接
    getConn(){
        let conn = mysql.createConnection({
            // 資料庫配置
            host:'127.0.0.1',
            port:'3306',
            user:'root',
            password:'',
            database:'test'
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBHelper;