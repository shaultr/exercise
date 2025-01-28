import axios from 'axios';

import queries from '../db/posts.query.js';

const API_URL = 'https://jsonplaceholder.typicode.com';

const getAllPostsFromJPH = async () => {

    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}
const savePostsInDB = async () => {
    try {
        const posts = await getAllPostsFromJPH();

        const insertPromises = posts.map(post => {
            return queries.insertPost({
                userId: post.userId,
                id: post.id,
                title: post.title,
                body: post.body
            });
        });

        await Promise.all(insertPromises);

        console.log('Posts saved to the database!');
    } catch (error) {
        console.error('Error saving posts:', error);
    }
};

// savePostsInDB()

const getAllPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    console.log("Page:", page, "Limit:", limit);
    try {
        const { posts, total } = await queries.getAllPosts(page, limit);
      const totalPages = Math.ceil(total / limit);
      res.json({
        posts,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: 'Something went wrong while fetching posts' });
    }
  };
  
  const getAllPostsSortedByTitle = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const { posts, total } = await queries.getAllPostsSortedByTitle(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.json({
            posts,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while fetching posts' });
    }
};


const getPostsByLetters = async (req, res) => {
    const { letters } = req.query;     
    if (!letters) {
        return res.status(400).json({ error: 'Letters parameter is required' });
    }

    try {
        const posts = await queries.getPostsByLetters(letters);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while fetching posts' });
    }
}



export default {
    getAllPosts,
    getAllPostsSortedByTitle,
    getPostsByLetters
};
