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

router.post('/login', (req, res) => {
    let conn = new DBHelper().getConn();
    const params = req.body;
    const sel_sql = $sql.user.select;

    conn.query(sel_sql, [params.email], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Server error");
            conn.end();
            return;
        }

        if (results.length === 0 || results[0].Password !== params.password) {
            res.status(401).send("-1"); // 身份驗證失敗
            conn.end();
        } else {
            // 生成 token 或執行其他身份驗證成功後的操作
            res.send({ token: "0" }); // 身份驗證成功
            conn.end();
        }
    });
});

router.get('/groupbuys', (req, res) => {
    let conn = new DBHelper().getConn();
    const query = 'SELECT * FROM GroupBuys';

    conn.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
        conn.end();
    });
});

router.get('/products', (req, res) => {
    let conn = new DBHelper().getConn();
    const query = 'SELECT * FROM Products';

    conn.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
        conn.end();
    });
});


router.post('/addToCart', (req, res) => {
    let conn = new DBHelper().getConn();
    const { userID, productID, quantity } = req.body;

    conn.beginTransaction(err =>{
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            conn.end();
            return;
    }

    conn.query('SELECT UserID FROM Carts WHERE UserID = ?', [userID], (err, cartResults) => {
        if (err) {
            conn.rollback(() => {
                res.status(500).send('Server error');
                conn.end();
            });
            return;
        }

        let cartID;
        if (cartResults.length === 0) {
            // 如果購物車不存在，則創建一個新的購物車
            conn.query('INSERT INTO Carts (UserID) VALUES (?)', [userID], (err, cartInsertResult) => {
                if (err) {
                    conn.rollback(() => {
                        res.status(500).send('Server error');
                        conn.end();
                    });
                    return;
                }
                cartID = cartInsertResult.insertId;
                insertOrUpdateCartItem();
            });
        } else {
            cartID = cartResults[0].CartID;
            insertOrUpdateCartItem();
        }

        function insertOrUpdateCartItem() {
            // 检查购物车项是否存在
            conn.query('SELECT CartItemID FROM CartItems WHERE CartID = ? AND ProductID = ?', [cartID, productID], (err, cartItemResults) => {
                if (err) {
                    conn.rollback(() => {
                        res.status(500).send('Server error');
                        conn.end();
                    });
                    return;
                }

                if (cartItemResults.length === 0) {
                    // 如果购物车项不存在，插入新的购物车项
                    conn.query('INSERT INTO CartItems (CartID, ProductID, Quantity) VALUES (?, ?, ?)', [cartID, productID, quantity], (err, insertResult) => {
                        if (err) {
                            conn.rollback(() => {
                                res.status(500).send('Server error');
                                conn.end();
                            });
                            return;
                        }
                        conn.commit(err => {
                            if (err) {
                                conn.rollback(() => {
                                    res.status(500).send('Server error');
                                    conn.end();
                                });
                                return;
                            }
                            res.send('Product added to cart');
                            conn.end();
                        });
                    });
                } else {
                    // 如果购物车项已存在，更新其数量
                    conn.query('UPDATE CartItems SET Quantity = Quantity + ? WHERE CartID = ? AND ProductID = ?', [quantity, cartID, productID], (err, updateResult) => {
                        if (err) {
                            conn.rollback(() => {
                                res.status(500).send('Server error');
                                conn.end();
                            });
                            return;
                        }
                        conn.commit(err => {
                            if (err) {
                                conn.rollback(() => {
                                    res.status(500).send('Server error');
                                    conn.end();
                                });
                                return;
                            }
                            res.send('Product quantity updated in cart');
                            conn.end();
                            });
                        });
                    }
                });
            }
        });
    });
});

module.exports = router;