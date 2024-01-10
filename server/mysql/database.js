const mysql = require('mysql');

class DBHelper {
    getConn() {
        let conn = mysql.createConnection({
            host:  'sql12.freemysqlhosting.net',
            port: '3306',
            user: 'sql12675265',
            password: 'QUYRWDZ6xn',
            database: 'sql12675265'
        });

        conn.connect((err) => {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }
            console.log('Connected to database.');
        });

        return conn;
    }
}

module.exports = DBHelper;