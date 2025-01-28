import express from "express";
import commentsController from '../controllers/comments.controller.js';

const router = express.Router();

router
    .get("/get-comments-by-postId", commentsController.getCommentsByPostId)


export default router