const mysql = require("mysql2/promise");

const db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'qwer1234',
    database: 'test'
}

module.exports = {
    init: function () {
        return mysql.createPool(db_info);
    }
}