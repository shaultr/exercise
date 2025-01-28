import pool from '../main.db.js';

const createCommentsTable = async () => {
    const SQL = `CREATE TABLE IF NOT EXISTS exercise.comments (
        postId INT,                   
        id INT PRIMARY KEY, 
        name VARCHAR(255),   
        email VARCHAR(255),   
        body TEXT  
    );`;

    try {
        const [data] = await pool.query(SQL);
    } catch (error) {
        console.error("Error creating table:", error.message);
    }
};
createCommentsTable()
const insertComment = async (comment) => {
    const SQL = `INSERT INTO comments (postId, id, name, email, body) VALUES (?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.query(SQL, [comment.postId, comment.id, comment.name, comment.email, comment.body]);
        ;
        return result;
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const getCommentsByPostId = async (postId) => {
    const SQL = `SELECT * FROM comments WHERE postId = ?`
    const [data] = await pool.query(SQL, [postId]);
    return data;
}

export default {
    insertComment,
    getCommentsByPostId,
};