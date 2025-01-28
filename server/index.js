import express from 'express';
import cors from 'cors';

import postsRouter from './routes/posts.router.js';
import commentsRouter from './routes/comments.router.js';

const app = express();
app.use(express.json());

app.use(cors());

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(8000, () => console.log("The server is running on port 8000"));
