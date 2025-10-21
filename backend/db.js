import mysql from 'mysql2/promise';
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Y@sser9040',
    database:'crypto'
});
export default db;