import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// import "dotenv/config";

// dotenv.config({ path: '../.env' });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'exercise',
    password: '1717' || process.env.SQL_PASSWORD
});

export default pool;
