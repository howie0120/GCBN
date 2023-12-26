const mysql = require('mysql');

class DBHelper {
    getConn() {
        let conn = mysql.createConnection({
            host:  'sql12.freemysqlhosting.net',
            port: '3306',
            user: 'sql12672704',
            password: 'p1zStN9cLh',
            database: 'sql12672704'
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