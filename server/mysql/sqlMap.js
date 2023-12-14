var sqlMap = {
    user: {
        // 添加使用者
        add: 'insert into users(name, age) values (?, ?)',
        // 查詢使用者
        select: 'select * from user where name like "%"?"%"'
    }
}

module.exports = sqlMap;