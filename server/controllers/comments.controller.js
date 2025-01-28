import axios from 'axios';

import queries from '../db/comments.query.js';

const API_URL = 'https://jsonplaceholder.typicode.com';

const getAllCommentsFromJPH = async () => {

    try {
        const response = await axios.get(`${API_URL}/comments`);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}
const saveCommentsInDB = async () => {
    console.log('first')
    try {
        const comments = await getAllCommentsFromJPH();
        const insertPromises = comments.map(comment => {
            return queries.insertComment({
                postId: comment.postId,
                id: comment.id,
                name: comment.name,
                email: comment.email,
                body: comment.body
            });
        });

        await Promise.all(insertPromises);

        console.log('Comments saved to the database!');
    } catch (error) {
        console.error('Error saving comments:', error);
    }
};

// saveCommentsInDB()

const getCommentsByPostId = async (req, res) => {
   const postId = req.query.postId;
    if (!postId) {
        return res.status(400).json({ error: 'PostId parameter is required' });
    }
    try {
        const posts = await queries.getCommentsByPostId(postId);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while fetching comments' });
    }
}


export default{
    getCommentsByPostId
}