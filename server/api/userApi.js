// 導入express
const express = require('express');
// 創建路由
const router = express.Router();


const $sql = require('../mysql/sqlMap');
const DBHelper = require('../mysql/database');

//增加用戶
router.post('/add', (req, res) => {
    let conn = new DBHelper().getConn();
    const params = req.body;
    const sel_sql = $sql.user.select + " where email = '" + params.email + "'";
    const add_sql = $sql.user.add;

    // console.log(sel_sql);

    conn.query(sel_sql, params.email, (error, results) => {
        if(error) {
            console.log(error);
        }
        if (results.length !== 0 && params.email === results[0].email) {
            res.send("-1");   // 電子郵件已存在
        } else {
            conn.query(add_sql, [params.email, params.password], (err, result) => {
                if (err) {
                    console.log(err);
                } else{
                    console.log(result);
                    res.send("0"); // 用戶創建成功
                }
            });
        }
    });
    conn.end();
});

router.post ('/selectUser', (req, res) => {
    const sel_sql = $sql.user.select;
    const params = req.body;
    const conn = new DBHelper().getConn();
    console.log('Connected to the database');
    conn.query(sel_sql, [params.email], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

module.exports = router;