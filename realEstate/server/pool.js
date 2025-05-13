import mysql from 'mysql2/promise'
export default mysql.createPool({
    host:'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port:3306,
    database:'nodeuser1',
    database: 'real_estate',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})