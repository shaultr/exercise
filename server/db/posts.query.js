import pool from '../main.db.js';

const createPostsTable = async () => {
    const SQL = `CREATE TABLE IF NOT EXISTS exercise.posts (
        userId INT,                   
        id INT PRIMARY KEY, 
        title VARCHAR(255),   
        body TEXT  
    );`;

    try {
        const [data] = await pool.query(SQL);
        // console.log("Table created successfully:", data);
    } catch (error) {
        console.error("Error creating table:", error.message);
    }
};
// createPostsTable()

const insertPost =  async (post) => {
    const SQL = `INSERT INTO posts (userId, id, title, body) VALUES (?, ?, ?, ?)`;

    try {
        const [result] = await pool.query(SQL, [post.userId, post.id, post.title, post.body]);
        ;
        return result;
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const getAllPosts = async (page, limit) => {
  const offset = (page - 1) * limit;
  
  const postsQuery = `SELECT * FROM posts LIMIT ${limit} OFFSET ${offset}`;
  const countQuery = `SELECT COUNT(*) AS total FROM posts`;
  
  const [posts] = await pool.query(postsQuery);
  const [[{ total }]] = await pool.query(countQuery);
  
  return { posts, total };
};


const getAllPostsSortedByTitle = async (page, limit) => {
    const offset = (page - 1) * limit;

    const postsQuery = `SELECT * FROM posts ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`;
    const countQuery = `SELECT COUNT(*) AS total FROM posts`;

    const [posts] = await pool.query(postsQuery);
    const [[{ total }]] = await pool.query(countQuery);

    return { posts, total };
};
// 

const getPostsByLetters = async (letters) => {
    const SQL = `SELECT * FROM posts WHERE title LIKE ?`;
    const [data] = await pool.query(SQL, [`%${letters}%`]); 
    return data;
}


export default{
    insertPost,
    getAllPosts,
    getAllPostsSortedByTitle,
    getPostsByLetters
};
