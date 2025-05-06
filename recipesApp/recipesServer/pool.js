import mysql from 'mysql2/promise';
export default mysql.createPool({
    host: 'database-recipes.c9i6ie4csty0.us-east-2.rds.amazonaws.com',
    //host:'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port:3306,
    //database:'nodeuser1',
    database: 'database-recipes',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});