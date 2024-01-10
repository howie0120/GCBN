const DBHelper = require('../mysql/database');

async function addCartItem(userId, productId, quantity) {
    let conn = new DBHelper().getConn();

    return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            if (err) {
                conn.end();
                return reject(err);
            }

            conn.query('SELECT CartID FROM Carts WHERE UserID = ?', [userId], (err, cartResults) => {
                if (err) {
                    conn.rollback(() => {
                        conn.end();
                        return reject(err);
                    });
                }

                let cartID;
                if (cartResults.length === 0) {
                    conn.query('INSERT INTO Carts (UserID) VALUES (?)', [userId], (err, cartInsertResult) => {
                        if (err) {
                            conn.rollback(() => {
                                conn.end();
                                return reject(err);
                            });
                        }
                        cartID = cartInsertResult.insertId;
                        insertOrUpdateCartItem();
                    });
                } else {
                    cartID = cartResults[0].CartID;
                    insertOrUpdateCartItem();
                }

                function insertOrUpdateCartItem() {
                    conn.query('SELECT CartItemID FROM CartItems WHERE CartID = ? AND ProductID = ?', [cartID, productId], (err, cartItemResults) => {
                        if (err) {
                            conn.rollback(() => {
                                conn.end();
                                return reject(err);
                            });
                        }

                        if (cartItemResults.length === 0) {
                            conn.query('INSERT INTO CartItems (CartID, ProductID, Quantity) VALUES (?, ?, ?)', [cartID, productId, quantity], (err) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.end();
                                        return reject(err);
                                    });
                                }
                                conn.commit(err => {
                                    conn.end();
                                    if (err) return reject(err);
                                    resolve({ message: 'Product added to cart' });
                                });
                            });
                        } else {
                            conn.query('UPDATE CartItems SET Quantity = Quantity + ? WHERE CartID = ? AND ProductID = ?', [quantity, cartID, productId], (err) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.end();
                                        return reject(err);
                                    });
                                }
                                conn.commit(err => {
                                    conn.end();
                                    if (err) return reject(err);
                                    resolve({ message: 'Product quantity updated in cart' });
                                });
                            });
                        }
                    });
                }
            });
        });
    });
}

module.exports = addCartItem;