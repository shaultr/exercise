import mysql from 'mysql2/promise';
import "dotenv/config";


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'exercise',
    password: process.env.SQL_PASSWORD
});

export default pool;
