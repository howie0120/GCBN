var sqlMap = {
    user: {
        // 添加使用者
        add: 'insert into Users(Email, Password) values (?, ?)',
        select: 'select * from Users where Email = ?'
    }
}

module.exports = sqlMap;