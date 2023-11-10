const models = require('../mysql/database');
const express = require('express');
const router = express.Router();


const $sql = require('../mysql/database');
const DBHelper = require('../mysql/database');


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
        if (results.length !== 0 && params.username === results[0].username) {
            res.send("-1");   // 電子郵件已存在
        } else {
            conn.query(add_sql, [params.email, params.password], (err, rst) => {
                if (err) {
                    console.log(err);
                } else{
                    console.log(rst);
                    res.send("0"); // 用戶創建成功
                }
            });
        }
    });
});

module.exports = router;
