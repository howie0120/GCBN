var sqlMap = {
    user: {
        add: 'insert into Users(Email, Password) values (?, ?)',
        select: 'select * from Users where Email = ?'
    },

    cart: {
        getCartItems: `
        SELECT ci.CartItemID, ci.CartID, ci.ProductID, ci.Quantity, p.ProductName, p.Price, p.ImageUrl
        FROM CartItems ci
        JOIN Products p ON ci.ProductID = p.ProductID
        WHERE ci.CartID = (SELECT CartID FROM Carts WHERE UserID = ?);
        `
    },

    groupbuy: {
        insertSql: `
            INSERT INTO GroupBuys (
                InitiatorUserID, TargetQuantity, StartDate, EndDate, Status, Description, Name
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `
    }
}

module.exports = sqlMap;