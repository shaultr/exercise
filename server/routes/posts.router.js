import express from "express";
import postsController from '../controllers/posts.controller.js';

const router = express.Router();

router
    .get("/get-all-posts", postsController.getAllPosts)
    .get("/get-posts-sorted", postsController.getAllPostsSortedByTitle)
    .get("/get-posts-by-letters", postsController.getPostsByLetters)


export default router