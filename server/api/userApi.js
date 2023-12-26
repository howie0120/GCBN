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
    const sel_sql = $sql.user.select;
    const add_sql = $sql.user.add;

    console.log(sel_sql);

    conn.query(sel_sql,  [params.email], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Server error");
            conn.end();
            return;
        }

        if (results.length !== 0) {
            res.send("-1"); // 電子郵件已存在
            conn.end();
            return;
        }
        // 插入新用户
        conn.query(add_sql, [params.email, params.password], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Server error");
            } else {
                console.log(result);
                res.send("0"); // 用戶創建成功
            }
            conn.end();
        })
    });
})

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
})

module.exports = router;